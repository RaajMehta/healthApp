import serial
import time
import csv
import re

try:
    # Configure port settings
    ser = serial.Serial("/dev/tty.usbserial-A403JGVS", 115200)
    time.sleep(2)

    print ('Serial communication established!')
    print ('\n')
    print ('Writing ...')
    print ('\n')

except:
    print ("Error opening port.")
    exit


data = []
if (ser.isOpen()):
    ser.write('get_dump_data#')

    try:
        with open ('userData.csv', 'wb') as datfile:

            header_str = ["Hours", "Minutes", "Seconds", "Day", "Month", "Year", "Longitude", "Latitude", "Attempt"]

            data_writer = csv.writer(datfile, dialect='excel')
            data_writer.writerows([header_str])            

            while(1):
                datain = ser.readline().strip()
                if (not datain.endswith("!")):
                    break
                else:
                    data.append(datain[:-1])

            print datain
            newData = [re.split(':|,', c) for c in data]
            data_writer = csv.writer(datfile, dialect='excel')
            
            #print newData
            for item in newData:
                data_writer.writerow(item)
    
    except KeyboardInterrupt:
        print ('Ending ....')
        ser.close()                
                
                
#close when work is done
print ('Closing ...')
ser.close()
