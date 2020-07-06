import datetime
import urllib

urls = ["https://10.125.88.154/X620/FR/AMSFR/","https://10.125.88.154/X620/FR/OHPortal/","https://gesundheitsportal.eu.airbus.corp/X620/GE/OH/","https://gesundheitsportal.eu.airbus.corp/X620/GE/Tasks/","https://gesundheitsportal.eu.airbus.corp/X620/GE/Reports/","https://airbusfirstcontact.eu.airbus.corp/X620/UK/OH/","https://airbusfirstcontact.eu.airbus.corp/X620/UK/Tasks","https://airbusfirstcontact.eu.airbus.corp/X620/UK/AMS/","https://ape.eu.airbus.corp/X620/ES/ape/","https://ape.eu.airbus.corp/X620/ES/OHPortal/","https://ape.eu.airbus.corp/X620/ES/Tasks/"]

for i, url in enumerate(urls):
    # Do the web-ping
    try:
        result = urllib.urlopen(url)
    except IOError:
        result = None

    # Prep the result dictionary
    temp = {
        'response_code': result.getcode() if result else 'url_not_found',
        'url': url,
        'time': str(datetime.datetime.now()).replace(" ","-")
    }

    print " ".join([str(key)+"="+str(temp[key]) for key in sorted(temp.keys())])

