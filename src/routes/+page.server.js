import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Giulio2006!',
    database: 'dragonball'
});

export const actions = {
    searchUser: async ({ request }) => {
        const formData = await request.formData();
        const nome = formData.get('nome');
    
        if (nome) {
            try {
                const query = `
                    SELECT Personaggi.*, 
                           Pianeti.nome AS nome_origine, 
                           Affiliazioni.nome AS nome_affiliazione, 
                           Archi.nome AS nome_arco, 
                           Razze.nome AS nome_razza, 
                           Serie.nome AS nome_serie 
                    FROM Personaggi
                    JOIN Pianeti ON Personaggi.origine = Pianeti.id
                    JOIN Affiliazioni ON Personaggi.affiliazione = Affiliazioni.id
                    JOIN Archi ON Personaggi.primoArco = Archi.id
                    JOIN Razze ON Personaggi.razza = Razze.id
                    JOIN Serie ON Personaggi.primaSerie = Serie.id
                    WHERE LOWER(Personaggi.nome) = LOWER(?)
                `;

                const [rows] = await db.query(query, [nome]);
                console.log("Dati estratti dal database:", rows);
    
                if (rows.length > 0) {
                    return {
                        success: true,
                        user: rows[0]
                    };
                } else {
                    return {
                        success: false,
                        message: "Utente non trovato"
                    };
                }
            } catch (error) {
                console.error("Errore durante la ricerca dell'utente:", error.stack);
                return {
                    success: false,
                    message: "Errore durante la ricerca dell'utente"
                };
            }
        } else {
            return {
                success: false,
                message: "Parametro 'nome' mancante"
            };
        }
    },        

    searchUserById: async ({ request }) => {
        const formData = await request.formData();
        const id = formData.get('id');
    
        if (id) {
            try {
                const query = `
                    SELECT Personaggi.*, 
                           Pianeti.nome AS nome_origine, 
                           Affiliazioni.nome AS nome_affiliazione, 
                           Archi.nome AS nome_arco, 
                           Razze.nome AS nome_razza, 
                           Serie.nome AS nome_serie 
                    FROM Personaggi
                    JOIN Pianeti ON Personaggi.origine = Pianeti.id
                    JOIN Affiliazioni ON Personaggi.affiliazione = Affiliazioni.id
                    JOIN Archi ON Personaggi.primoArco = Archi.id
                    JOIN Razze ON Personaggi.razza = Razze.id
                    JOIN Serie ON Personaggi.primaSerie = Serie.id
                    WHERE Personaggi.id = ?
                `;

                const [rows] = await db.query(query, [id]);
                console.log("Dati estratti dal database:", rows);
        
                if (rows.length > 0) {
                    return {
                        success: true,
                        user: rows[0]
                    };
                } else {
                    return {
                        success: false,
                        message: "Utente non trovato"
                    };
                }
            } catch (error) {
                console.error("Errore durante la ricerca dell'utente:", error.stack);
                return {
                    success: false,
                    message: "Errore durante la ricerca dell'utente"
                };
            }
        } else {
            return {
                success: false,
                message: "Parametro 'id' mancante"
            };
        }
    },    

    getId: async ({ request }) => {
        const formData = await request.formData();
        const selectedValue = formData.get('selectedValue');
    
        if (selectedValue) {
            try {
                const query = `
                    SELECT SerieApparizioni.personaggio_id 
                    FROM SerieApparizioni
                    JOIN Serie ON SerieApparizioni.serie_id = Serie.id
                    WHERE Serie.nome = ?
                `;

                const [rows] = await db.query(query, [selectedValue]);
    
                if (rows.length > 0) {
                    return {
                        success: true,
                        lista: rows
                    };
                } else {
                    return {
                        success: false,
                        message: "Nessun personaggio trovato"
                    };
                }
            } catch (error) {
                console.error("Errore durante la ricerca:", error.stack);
                return {
                    success: false,
                    message: "Errore durante la ricerca"
                };
            }
        } else {
            return {
                success: false,
                message: "Parametro 'selectedValue' mancante"
            };
        }
    },    

    getSuggestions: async ({ request }) => {
        const formData = await request.formData();
        const term = formData.get('term');
        const selectedValue = formData.get('selectedValue');

        if (term) {
            if (selectedValue === "tutti") {
                try {
                    const query = 'SELECT nome, immagine FROM Personaggi WHERE nome LIKE ?';
    
                    const [rows] = await db.query(query, [`${term}%`]);
                    console.log("Suggerimenti trovati:", rows);
    
                    return {
                        success: true,
                        suggestions: rows
                    };
                } catch (error) {
                    console.error("Errore durante il recupero dei suggerimenti:", error.stack);
                    return {
                        success: false,
                        suggestions: []
                    };
                }
            } else {
                try {
                    const query = `
                        SELECT Personaggi.nome, Personaggi.immagine
                        FROM Personaggi
                        JOIN SerieApparizioni ON Personaggi.id = SerieApparizioni.personaggio_id
                        JOIN Serie ON Serie.id = SerieApparizioni.serie_id
                        WHERE Personaggi.nome LIKE ?
                        AND Serie.nome = ?;
                    `;
    
                    const [rows] = await db.execute(query, [`${term}%`, selectedValue]);
                    console.log("Suggerimenti trovati:", rows);
    
                    return {
                        success: true,
                        suggestions: rows
                    };
                } catch (error) {
                    console.error("Errore durante il recupero dei suggerimenti:", error.stack);
                    return {
                        success: false,
                        suggestions: []
                    };
                }
            }
        } else {
            return {
                success: false,
                suggestions: []
            };
        }
    }
};