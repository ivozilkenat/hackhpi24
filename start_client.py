from _utilities import *
            
def start_client(path=os.path.join(os.getcwd(), "client")):
    run_command(f'cd {path} && npm start -- --port 80')

if __name__ == "__main__":
    start_client()
