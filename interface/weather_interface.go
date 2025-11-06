package iface

type PluginMeta struct {
	Name         string `json:"name"`
	Version      string `json:"version"`
	Beschreibung string `json:"beschreibung"`
	Author       string `json:"author"`
}

type Endpoint struct {
	Path    string   `json:"path"`
	Methods []string `json:"methods"`
	Handler string   `json:"handler"`
}

type PluginConfig struct {
	Port      int        `json:"port"`
	Endpoints []Endpoint `json:"endpoints"`
}
