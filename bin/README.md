
#將觸電網的年度電影清單建置至Google表單  


申請 API 用帳號
===
申請一個可以用來存取 Google Sheets 的帳號。步驟如下：

1.先到 [Google Developers Console](https://console.developers.google.com/project) 建立一個 project。  
2.啟動該 project 的 Google Sheets API 。  
3.在 Credentials 頁面按下 Create credentials -> 建立服務帳戶金鑰。  
4.取好名字，選擇 JSON 作為 Key type。  
下載好 JSON 檔案，把他取名為 auth.json

您必須具備憑證，才能使用這個 API。首先，請點選 [建立憑證]。

[gspread](https://pypi.python.org/pypi/gspread/2.0.0)  

建立試算表
===
 Google Sheets 建立一個試算表，同時將試算表檔案共用，分享給 auth.json 裡 client_email 欄位提到的 email 帳號： `name...@....gserviceaccount.com`，並給予編輯的權限，開放程式存取。

將試算表多餘的欄位刪除，建立date欄，並留下新的一個空白行，好讓程式插入資料時，也能有白色背景。

最後我們把網址中 https://docs.google.com/spreadsheets/d/{key}/edit 的 {key} 複製到 spreadsheet_key 檔案裡，供之後程式要開啟試算表時存取。

生成電影名單
===
`$python all_movies.py`  

http://www.truemovie.com/tairelease2018.htm  
輸出結果 https://docs.google.com/spreadsheets/d/1_q-Ud2TUuNxCkCDCEh59MSnd5BrrS_q4V67rE8BtI8E/edit#gid=0 工作表1  


#製作FB分享圖 電影海報牆  

Chrome外掛 [DownFaster](https://chrome.google.com/webstore/detail/downfaster/dcloeafkedgmoodilkgbjbdfbieoiiab)一鍵下載當前網頁的所有素材檔  
[PhotoScape](http://www.photoscape.org/ps/main/index.php): Free Photo Editing Software (Photo Editor) 