import os

video_dir = "/root/src"
for i, file in enumerate(os.listdir(video_dir)):
    if os.path.isfile(os.path.join(video_dir, file)):
        os.system(f"VID={i} VIDEO_PATH={os.path.join(video_dir, file)} screen -d -m docker compose -p inst{i} up")
        print(f"VID={i} VIDEO_PATH={os.path.join(video_dir, file)} screen -d -m docker compose -p inst{i} up")