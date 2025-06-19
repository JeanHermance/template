// seed.ts ou scripts/seed.ts

import { DataSource } from "typeorm";
import { Niveau } from "./entities/Niveau"; // Ton entité Niveau
import { AppDataSource } from "./config/database"; // Ton fichier de config TypeORM

const seedNiveaux = async () => {
    try {
        await AppDataSource.initialize();

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
            }
        }

        console.log("Insertion de niveau avec success !");
        process.exit(0);
    } catch (error) {
        console.error("❌ Erreur de seed:", error);
        process.exit(1);
    }
};

seedNiveaux();
