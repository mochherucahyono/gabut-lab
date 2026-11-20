const base =
    import.meta.env.BASE_URL;

export const gamesList = [{
        id: 1,
        title: "Neon Rush 3D",
        category: "Arcade",
        description: "Hindari rintangan, kumpulkan koin, dan bertahan sejauh mungkin di lintasan neon tiga jalur.",
        thumbnail: `${base}/images/neon-rush-3d.png `,
        tags: ["Babylon.js ", "JavaScript", "CSS ", "Vite ", "WebGL", "GitHub Pages"],
        demoUrl: "https://mochherucahyono.github.io/neon-rush-3d/",
        repoUrl: "https://github.com/mochherucahyono/neon-rush-3d",
        notes: "Sistem modular, skor tersimpan lewat localStorage, serta efek cahaya, suara, partikelnya, dan performa lintasan dioptimalkan"
    },

    {
        "id": 2,
        "title": "Java Drift",
        "category": "Drift",
        "description": "Game balap 3D berbasis web dengan lintasan berkelok, kontrol drift, skor combo, dan asap ban.",
        "thumbnail": `${base}/images/java-drift.png`,
        "tags": ["Babylon.js", "TypeScript", "Vite"],
        "demoUrl": "https://mochherucahyono.github.io/java-drift/",
        "repoUrl": "https://github.com/mochherucahyono/java-drift",
        "notes": "Menggunakan Babylon.js untuk rendering 3D, simulasi drift buatan sendiri, serta kontrol keyboard dan layar sentuh."
    }

];