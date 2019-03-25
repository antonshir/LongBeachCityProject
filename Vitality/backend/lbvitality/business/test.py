import os

print('>>> ' + os.path.dirname(__file__))
print('\n\n')
print('>>> ' + os.path.abspath(os.path.dirname(__file__)))
print('\n\n')
print('>>> ' + '/'.join((os.path.dirname(os.path.abspath(__file__))+'').split('/')[0:-4]) + '/Data/business.csv')
