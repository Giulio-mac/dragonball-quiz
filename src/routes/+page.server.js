import Database from 'better-sqlite3';

const db = new Database('./dragonball.db', { verbose: console.log });

export const actions = {
    searchUser: async ({ request }) => {
        const formData = await request.formData();
        const nome = formData.get('nome');

        if (nome) {
            try {
                console.log(nome);
                const query = db.prepare(`
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
                `);

                const personaggio = query.get(nome);
                console.log("dati estratti dal database: ", personaggio);

                if (personaggio) {
                    return {
                        success: true,
                        user: personaggio
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
                const query = db.prepare(`SELECT Personaggi.*, 
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
                    WHERE Personaggi.id = ?`
                );

                const personaggio = query.get(id);

                if (personaggio) {
                    return {
                        success: true,
                        user: personaggio
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
                const query = db.prepare(`SELECT SerieApparizioni.personaggio_id 
                        FROM SerieApparizioni
                        JOIN Serie ON SerieApparizioni.serie_id = Serie.id
                        WHERE Serie.nome = ?;`
                );

                const lista = query.all(selectedValue);

                if (lista) {
                    return {
                        success: true,
                        lista: lista
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

    getSuggestions: async ({ request }) => {
        const formData = await request.formData();
        const term = formData.get('term');
        const selectedValue = formData.get('selectedValue');
    
        console.log(selectedValue)
        if (term) {
            if (selectedValue === "tutti") {
                try {
                    const query = db.prepare('SELECT nome, immagine FROM Personaggi WHERE nome LIKE ?');
    
                    const suggestions = query.all(`${term}%`);
                    console.log("Suggerimenti trovati:", suggestions);
        
                    return {
                        success: true,
                        suggestions: suggestions
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
                    const query = db.prepare(`
                        SELECT Personaggi.nome, Personaggi.immagine
                        FROM Personaggi
                        JOIN SerieApparizioni ON Personaggi.id = SerieApparizioni.personaggio_id
                        JOIN Serie ON Serie.id = SerieApparizioni.serie_id
                        WHERE Personaggi.nome LIKE ?
                        AND Serie.nome = ?;
                    `);
    
                    const suggestions = query.all(`${term}%`, selectedValue);
                    console.log("Suggerimenti trovati:", suggestions);
        
                    return {
                        success: true,
                        suggestions: suggestions
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
    },

    deleteAllUsers: async () => {
        try {
            const deleteStmt = db.prepare('DELETE FROM personaggio');
            const result = deleteStmt.run();

            return {
                success: true,
                message: `${result.changes} utenti eliminati con successo.`
            };
        } catch (error) {
            console.error("Errore durante l'eliminazione degli utenti:", error.stack);
            return {
                success: false,
                error: "Errore durante l'eliminazione degli utenti."
            };
        }
    }
};