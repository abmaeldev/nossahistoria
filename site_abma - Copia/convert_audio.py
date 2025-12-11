import os
import subprocess

# Caminhos
SOURCE_DIR = "musicas_site/orig"
DEST_DIR = "musicas_site"

def convert_audio():
    if not os.path.exists(SOURCE_DIR):
        print(f"Pasta {SOURCE_DIR} não encontrada.")
        return

    files = [f for f in os.listdir(SOURCE_DIR) if f.endswith(".mpeg") or f.endswith(".mp3")]
    
    for i, filename in enumerate(files):
        input_path = os.path.join(SOURCE_DIR, filename)
        output_name = f"musica{i+1}.mp3"
        output_path = os.path.join(DEST_DIR, output_name)
        
        print(f"Convertendo {filename} para {output_name}...")
        
        # Comando ffmpeg
        cmd = [
            "ffmpeg", "-y", "-i", input_path,
            "-codec:a", "libmp3lame", "-qscale:a", "2",
            output_path
        ]
        
        try:
            subprocess.run(cmd, check=True)
            print("Sucesso!")
        except Exception as e:
            print(f"Erro ao converter: {e}")
            print("Tentando copiar apenas...")
            import shutil
            shutil.copy(input_path, output_path)

if __name__ == "__main__":
    convert_audio()