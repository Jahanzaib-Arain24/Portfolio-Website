const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function exportBackup() {
  console.log('Connecting to Neon Cloud Database...');

  const [
    profile,
    projects,
    categories,
    skills,
    experiences,
    certifications,
    education,
    messages,
    settings,
  ] = await Promise.all([
    prisma.profile.findFirst({ include: { socialLinks: true } }),
    prisma.project.findMany({ orderBy: { order: 'asc' } }),
    prisma.skillCategory.findMany({ include: { skills: true }, orderBy: { order: 'asc' } }),
    prisma.skill.findMany({ orderBy: { order: 'asc' } }),
    prisma.experience.findMany({ orderBy: { order: 'asc' } }),
    prisma.certification.findMany({ orderBy: { order: 'asc' } }),
    prisma.education.findMany({ orderBy: { order: 'asc' } }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.siteSettings.findFirst(),
  ]);

  const backupData = {
    exportedAt: new Date().toISOString(),
    profile,
    projects,
    categories,
    skills,
    experiences,
    certifications,
    education,
    messages,
    settings,
  };

  const backupsDir = path.join(process.cwd(), 'backups');
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const timeStr = `${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}`;
  const fileName = `backup-${dateStr}_${timeStr}.json`;
  const filePath = path.join(backupsDir, fileName);

  fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2), 'utf8');

  console.log('--------------------------------------------------');
  console.log('🎉 BACKUP COMPLETED SUCCESSFULLY!');
  console.log(`📁 File Saved: backups/${fileName}`);
  console.log(`📊 Statistics:`);
  console.log(`   - Projects: ${projects.length}`);
  console.log(`   - Skills: ${skills.length}`);
  console.log(`   - Experiences: ${experiences.length}`);
  console.log(`   - Certifications: ${certifications.length}`);
  console.log(`   - Education: ${education.length}`);
  console.log(`   - Contact Messages: ${messages.length}`);
  console.log('--------------------------------------------------');
}

exportBackup()
  .catch((err) => {
    console.error('Backup failed:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

