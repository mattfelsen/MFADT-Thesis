# Some random notes in place a real readme

# Set up wifi reconnect
	cd /etc/ifplugd/action.d/
	sudo cp ifupdown ifupdown.bak
	sudo cp /etc/wpa_supplicant/ifupdown.sh ./ifupdown
	sudo reboot

# Add startup script to start node script for watching lever on boot
	sudo cp misc/init.d/lostlandmarks /etc/init.d/lostlandmarks
	sudo update-rc.d lostlandmarks defaults

# Code for keeping various scripts running
	mkdir ~/.forever/logs
	sudo forever start -l /home/pi/.forever/logs/forever.log -o /home/pi/.forever/logs/output.log -e /home/pi/.forever/logs/error.log -a gpio-socket.io.js
	sudo forever start -l logs/forever.log -o logs/output.log -e logs/error.log -a server.js