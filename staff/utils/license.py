import requests
from bs4 import BeautifulSoup


class SiaSearchComponent:
    def __init__(self):
        self.result = dict()

    def submit(self, licence_no):
        headers = {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "Access-Control-Allow-Origin": "*",
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        }
        data = "LicenseNo=" + licence_no
        response = requests.post(
            "https://services.sia.homeoffice.gov.uk/PublicRegister/SearchPublicRegisterByLicence",
            data=data,
            headers=headers,
        )
        if response.status_code == 200:
            html_data = response.text
            soup = BeautifulSoup(html_data, "html.parser")
            panel= soup.find(class_="panel-body")
            if panel:
                names = soup.find_all("div", class_="ax_h5")
                self.result["first_name"] = names[0].get_text(strip=True).lower()
                self.result["surname"] = names[1].get_text(strip=True).lower()
                raw_data = soup.find_all("div", class_="ax_h4")
                self.result["licence_no"] = raw_data[0].get_text(strip=True).lower()
                self.result["role"] = raw_data[1].get_text(strip=True).lower()
                self.result["licence_sector"] = raw_data[2].get_text(strip=True).lower()
                self.result["expiry_date"] = raw_data[3].get_text(strip=True).lower() # Not applicable if status: Revoked
                self.result["status"] = (
                    soup.find("span", class_="italic_13").get_text(strip=True).split(" ", 1)[0].lower()
                )  # Active - remove -
                self.result["registered"] = (
                    soup.find("span", class_="as-on-date").get_text(strip=True).split(" ", 2)[2].replace(")", "")
                )  # (as on 19 December 2022) remove as on replace last )
                print(self.result)
                return self.result
            else:
                self.result = None
        else:
            self.result["status_code"] = response.status_code


# Create an instance of the component
sia_search = SiaSearchComponent()

#Set the necessary properties before calling submit()
licence_number = "1012632966248470"  # Active
#licence_number = "1037385693962636"  # Revoked
#licence_number = "1012720577305946" # Expired needed

#Call the submit() method to perform the request and process the response
sia_search.submit(licence_number)
