import json
import os
from jinja2 import Environment, FileSystemLoader

def generar_biblioteca():
    print("Iniciando Motor FLE...")
    
    # 1. Cargar la base de datos de temas
    ruta_json = "../data/bibliotheque.json"
    with open(ruta_json, 'r', encoding='utf-8') as file:
        temas = json.load(file)
        
    # 2. Configurar el motor de plantillas
    env = Environment(loader=FileSystemLoader('../templates'))
    template = env.get_template('template-theme.html')
    
    # 3. Generar todas las páginas en milisegundos
    directorio_salida = "../club/temas/"
    os.makedirs(directorio_salida, exist_ok=True)
    
    for tema in temas:
        nombre_archivo = f"theme-{tema['id']}.html"
        ruta_salida = os.path.join(directorio_salida, nombre_archivo)
        
        # Inyectar los datos en el molde
        html_final = template.render(tema=tema)
        
        # Guardar la página lista para producción
        with open(ruta_salida, 'w', encoding='utf-8') as out_file:
            out_file.write(html_final)
            
        print(f"[COMPLETADO] {nombre_archivo} generado.")
        
    print(f"Total: {len(temas)} temas listos para la Biblioteca.")

if __name__ == "__main__":
    generar_biblioteca()
