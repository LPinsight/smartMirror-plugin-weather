package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	iface "github.com/LPinsight/smartMirror-plugin-weather/interface"
)

func main() {
	// api.json lesen
	metaFile, _ := os.ReadFile("plugin.json")
	var meta iface.PluginMeta
	json.Unmarshal(metaFile, &meta)

	fmt.Printf("Starte Plugin: %s v%s\nBeschreibung: %s\n\n", meta.Name, meta.Version, meta.Beschreibung)

	// api.json lesen
	file, err := os.ReadFile("api.json")
	if err != nil {
		log.Fatal(err)
	}

	var cfg iface.PluginConfig
	if err := json.Unmarshal(file, &cfg); err != nil {
		log.Fatal(err)
	}

	// HandlerMap aus handlers.go verwenden
	for _, ep := range cfg.Endpoints {
		ep := ep
		handlerFunc, ok := HandlerMap[ep.Handler]
		if !ok {
			log.Printf("Handler %s nicht gefunden für %s\n", ep.Handler, ep.Path)
			continue
		}

		http.HandleFunc(ep.Path, func(w http.ResponseWriter, r *http.Request) {
			// Methoden prüfen
			allowed := false
			for _, m := range ep.Methods {
				if r.Method == m {
					allowed = true
					break
				}
			}
			if !allowed {
				http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
				return
			}

			handlerFunc(w, r)
		})

		fmt.Printf("Endpoint registriert: %s Methods: %v -> Handler: %s\n", ep.Path, ep.Methods, ep.Handler)
	}

	uiDir := "./ui"
	fs := http.FileServer(http.Dir(uiDir))
	http.Handle("/ui/", http.StripPrefix("/ui/", fs))
	fmt.Printf("Static UI wird bereitgestellt unter: http://localhost:%d/ui\n", cfg.Port)

	addr := fmt.Sprintf(":%d", cfg.Port)
	log.Printf("Plugin läuft auf %s\n", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}
