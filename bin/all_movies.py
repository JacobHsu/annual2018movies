import requests
import gspread
import configparser

from oauth2client.service_account import ServiceAccountCredentials
from bs4 import BeautifulSoup

config = configparser.ConfigParser()
config.read("config.ini")

def auth_gss_client(path, scopes):
    credentials = ServiceAccountCredentials.from_json_keyfile_name(path,scopes)
    return gspread.authorize(credentials)

def update_sheet(gss_client, key, text):
    wks = gss_client.open_by_key(key)
    sheet = wks.sheet1
    sheet.insert_row([text], 2)


target_url = 'http://www.truemovie.com/tairelease2018.htm'
rs = requests.session()
res = rs.get(target_url, verify=False)
res.encoding = 'Big5'
soup = BeautifulSoup(res.text, 'html.parser')
content = ""

for index, data in enumerate(soup.select('table td a')):
    movie = data.text.replace('\n', '').replace('\u3000', '').replace(" ", "").replace('\t', '').replace('\r', '') 

    auth_json_path = config['gspread']['auth_json_path']
    spreadsheet_key = config['gspread']['spreadsheet_key']
    gss_scopes = ['https://spreadsheets.google.com/feeds']
    gss_client = auth_gss_client(auth_json_path, gss_scopes)
    update_sheet(gss_client, spreadsheet_key, movie)
    print(movie)