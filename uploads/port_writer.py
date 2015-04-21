import serial
import csv

try:
    ser = serial.Serial("/dev/tty.usbserial-A403JGVS", 115200)
except:
    print ('Error opening port.')
    exit


outData = []
with open ('command.csv', 'rb') as datfile:
    if (ser.isOpen()):
        data_reader = csv.reader (datfile)
        for row in data_reader:
            #ser.write(row)
            outData.extend(row)
        
        string_to_send = ""
        for c in outData:
            string_to_send += c

            if c is not "#":
                string_to_send += ":"
            else:
                string_to_send = string_to_send[:-2] + "#"

        print(string_to_send)
        string_to_send = string_to_send[:-2] + "#"

        ser.write(string_to_send)
        
#close when work is done
ser.close()




