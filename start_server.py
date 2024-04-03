from _utilities import *
            
def start_server(path=os.path.join(os.getcwd(), "server")):

    if not os.path.exists(os.path.join(path, 'venv')):
        print("Missing venv")
        exit(1)

    print("Activating the virtual environment")
    if sys.platform == "win32":
        # Windows requires a different command to activate the virtual environment
        run_command(f'cd {path} && .\\venv\\Scripts\\activate && uvicorn main:app --port=3001')
    else:
        # Linux and macOS use this command
        run_command(f'cd {path} && . venv/bin/activate && uvicorn main:app --port=3001')

if __name__ == "__main__":
    start_server()
