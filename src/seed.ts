// scripts/seed.ts
import { AppDataSource } from "./config/database";  // adapte le chemin
import { Parent } from "./entities/Parent";
import { Niveau } from "./entities/Niveau";
import { Theme } from "./entities/Theme";
import bcrypt from "bcryptjs";

const seedUsers = async () => {
  const userRepo = AppDataSource.getRepository(Parent);


  const userExist = await userRepo.findOneBy({ email: "admin@example.com" });
  if (!userExist) {
    const user = userRepo.create({
      username: "admin",
      email: "admin@example.com",
      password: await bcrypt.hash("password", 10),
      isActive: true,
    });
    await userRepo.save(user);
    console.log("✅ User seedé");
  } else {
    console.log("ℹ️ User déjà existant");
  }
};

const seedNiveaux = async () => {
  const niveauRepo = AppDataSource.getRepository(Niveau);


  const niveaux = [
    { nom_niveau: "Débutant", description: "Introduction à la technologie" },
    { nom_niveau: "Intermédiaire", description: "Création et manipulation" },
    { nom_niveau: "Avancé", description: "Programmation de base (code)" },
  ];

  for (const n of niveaux) {
    const exists = await niveauRepo.findOneBy({ nom_niveau: n.nom_niveau });
    if (!exists) {
      const niveau = niveauRepo.create(n);
      await niveauRepo.save(niveau);
      console.log(`✅ Niveau inséré: ${n.nom_niveau}`);
    } else {
      console.log(`ℹ️ Niveau déjà existant: ${n.nom_niveau}`);
    }
  }
};

const seedThemes = async () => {
  const themeRepo = AppDataSource.getRepository(Theme);
  const userRepo = AppDataSource.getRepository(Parent);
  const niveauRepo = AppDataSource.getRepository(Niveau);


  const user = await userRepo.findOneBy({ email: "admin@example.com" });
  const niveau = await niveauRepo.findOneBy({ nom_niveau: "Débutant" });

  if (!user || !niveau) {
    console.warn("❌ Aucun user ou niveau trouvé. Seed annulé.");
    return;
  }

  const themes = [
    {
      nom_theme: "Découverte des Objets",
      description: "Apprendre à identifier les objets du quotidien.",
      image_url: "https://example.com/objets.png",
      user,
      niveau,
    },
    {
      nom_theme: "Robotique simple",
      description: "Construire un robot en Lego.",
      image_url: "https://example.com/robot.png",
      user,
      niveau,
    },
  ];

  for (const t of themes) {
    const exist = await themeRepo.findOneBy({ nom_theme: t.nom_theme });
    if (!exist) {
      const theme = themeRepo.create(t);
      await themeRepo.save(theme);
      console.log(`✅ Thème inséré: ${t.nom_theme}`);
    } else {
      console.log(`ℹ️ Thème déjà existant: ${t.nom_theme}`);
    }
  }
};

const seedAll = async () => {
  try {
    await AppDataSource.initialize();
    await seedUsers();
    await seedNiveaux();
    await seedThemes();
    console.log("🎉 Seed terminé !");
    process.exit(0);
  } catch (error) {
    console.error("❌ Erreur lors du seed :", error);
    process.exit(1);
  }
};

seedAll();
