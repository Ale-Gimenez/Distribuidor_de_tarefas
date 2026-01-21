from http.server import BaseHTTPRequestHandler
import json
import random

FUNCOES_FIXAS = [
    "Varrer Chão",
    "Varrer Chão",
    "Limpar TV",
    "Limpar armários",
    "Limpar Lockers",
    "Limpar Lockers",
    "Limpar Rodapé",
    "Limpar Rodapé",
    "Limpar mesa do instrutor",
    "Limpar janela",
    "Organizar fios",
    "Organizar fios",
    "Verificar etiquetas",
    "Organizar cadeiras",
    "Organizar equipamentos",
    "Organizar equipamentos"
]

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # Ler o corpo da requisição
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            nomes = data.get('nomes', [])
            
            # Validação
            if len(nomes) != 16:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'erro': f'São necessários exatamente 16 nomes. Recebidos: {len(nomes)}'
                }, ensure_ascii=False).encode('utf-8'))
                return
            
            # Verificar nomes únicos
            nomes_lower = [n.lower().strip() for n in nomes]
            if len(set(nomes_lower)) != 16:
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.end_headers()
                self.wfile.write(json.dumps({
                    'erro': 'Existem nomes duplicados'
                }, ensure_ascii=False).encode('utf-8'))
                return
            
            # Embaralhar funções
            funcoes_embaralhadas = FUNCOES_FIXAS.copy()
            random.shuffle(funcoes_embaralhadas)
            
            # Criar distribuição
            distribuicao = []
            for i, nome in enumerate(nomes):
                distribuicao.append({
                    'nome': nome.strip(),
                    'funcao_principal': funcoes_embaralhadas[i],
                    'fiscal': False
                })
            
            # Selecionar 2 fiscais aleatórios
            indices_fiscais = random.sample(range(16), 2)
            for idx in indices_fiscais:
                distribuicao[idx]['fiscal'] = True
            
            # Resposta de sucesso
            self.send_response(200)
            self.send_header('Content-type', 'application/json; charset=utf-8')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'distribuicao': distribuicao,
                'total_pessoas': len(nomes),
                'total_fiscais': 2
            }, ensure_ascii=False).encode('utf-8'))
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps({
                'erro': f'Erro interno: {str(e)}'
            }).encode('utf-8'))
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_GET(self):
        # Endpoint de teste
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()
        self.wfile.write(json.dumps({
            'status': 'API funcionando',
            'endpoint': '/api/gerar-funcoes',
            'method': 'POST'
        }).encode('utf-8'))