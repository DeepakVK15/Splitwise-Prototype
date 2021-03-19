import axios from "axios";
import React, { Component } from "react";
import Head from "../Heading/Heading";
import "./profile.css";
import cookie from "react-cookies";
import { Redirect } from "react-router";
import {uri} from '../../uri';

class Profile extends Component {
  state = {
    name: "",
    email: "",
    phone: "",
    timezone: "",
    language: "",
    currency: "",
    redirectVar: "",
  };

  componentDidMount() {
    axios
      .get(`${uri}/profile/myprofile`, {
        params: { email: cookie.load("cookie") },
      })
      .then((response) => {
        // update the state with the response data
        if (response.data[0] !== undefined) {
          this.setState({ name: response.data[0].name });
          this.setState({ email: response.data[0].email });
          this.setState({ phone: response.data[0].phone });
          this.setState({ timezone: response.data[0].timezone });
          this.setState({ language: response.data[0].language });
          this.setState({ currency: response.data[0].currency });
        }
      });
  }

  nameChange = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  emailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  phoneChange = (e) => {
    this.setState({
      phone: e.target.value,
    });
  };

  languageChange = (e) => {
    this.setState({
      language: e.target.value,
    });
  };

  currencyChange = (e) => {
    this.setState({
      currency: e.target.value,
    });
  };

  timezoneChange = (e) => {
    this.setState({
      timezone: e.target.value,
    });
  };

  save = () => {
    const data = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      timezone: this.state.timezone,
      language: this.state.language,
      currency: this.state.currency,
    };

    axios
      .put(`${uri}/profile/myprofile`, data)
      .then((response) => {
        if (response.data === "Profile updated successfully") {
          this.setState({ redirectVar: <Redirect to="/dashboard" /> });
        }
      });
  };
  render() {
    if (!cookie.load("cookie")) {
      this.setState({ redirectVar: <Redirect to="/" /> });
    }
    return (
      <div>
        {this.state.redirectVar}
        <Head />
        <div className="profile">
          <div>
            <form>
              <h3>Your Account</h3>
              <br />
              <br />
              <label>Your name</label>
              <br />
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.nameChange}
                data-testid="name"
              />
              <br />
              <br />
              <label>Your email address</label>
              <br />
              <input
                data-testid="email"
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.emailChange}
              />
              <br />
              <br />
              <label>Your phone number</label>
              <br />
              <input
                type="text"
                name="phone"
                value={this.state.phone}
                onChange={this.phoneChange}
                data-testid="phone"
              />
              <br/>
              <br />
              <label>Change your Picture</label>
                <br/>
                <input type="file"/>
                <br/>
            </form>
          </div>
          <div className="profile2">
            <label>Your default currency</label>
            <br />
            <select
              onChange={this.currencyChange}
              value={this.state.currency}
              id="currency"
              name="currency"
            >
              <option value="$">USD</option>
              <option value="KWD">KWD</option>
              <option value="GBP">GBP</option>
              <option value="EUR">EUR</option>
              <option value="CAD">CAD</option>
            </select>
            <br />
            <br />
            <label>Your time zone</label>
            <br />
            <select
              onChange={this.timezoneChange}
              value={this.state.timezone}
              id="timezone"
              name="timezone"
            >
              <option value="(GMT-12:00) International Date Line West">
                (GMT-12:00) International Date Line West
              </option>
              <option value="(GMT-11:00) Midway Island, Samoa">
                (GMT-11:00) Midway Island, Samoa
              </option>
              <option value="(GMT-10:00) Hawaii">(GMT-10:00) Hawaii</option>
              <option value="(GMT-09:00) Alaska">(GMT-09:00) Alaska</option>
              <option value="(GMT-08:00) Pacific Time (US & Canada)">
                (GMT-08:00) Pacific Time (US & Canada)
              </option>
              <option value="America/Tijuana">
                (GMT-08:00) Tijuana, Baja California
              </option>
              <option value="(GMT-08:00) Tijuana, Baja California">
                (GMT-08:00) Tijuana, Baja California
              </option>
              <option value="(GMT-07:00) Arizona">(GMT-07:00) Arizona</option>
              <option value="(GMT-07:00) Chihuahua, La Paz, Mazatlan">
                (GMT-07:00) Chihuahua, La Paz, Mazatlan
              </option>
              <option value="(GMT-07:00) Mountain Time (US & Canada)">
                (GMT-07:00) Mountain Time (US & Canada)
              </option>
              <option value="(GMT-06:00) Central America">
                (GMT-06:00) Central America
              </option>
              <option value="(GMT-06:00) Central Time (US & Canada)">
                (GMT-06:00) Central Time (US & Canada)
              </option>
              <option value="(GMT-06:00) Guadalajara, Mexico City, Monterrey">
                (GMT-06:00) Guadalajara, Mexico City, Monterrey
              </option>
              <option value="(GMT-06:00) Saskatchewan">
                (GMT-06:00) Saskatchewan
              </option>
              <option value="(GMT-05:00) Bogota, Lima, Quito, Rio Branco">
                (GMT-05:00) Bogota, Lima, Quito, Rio Branco
              </option>
              <option value="(GMT-05:00) Eastern Time (US & Canada)">
                (GMT-05:00) Eastern Time (US & Canada)
              </option>
              <option value="(GMT-05:00) Indiana (East)">
                (GMT-05:00) Indiana (East)
              </option>
              <option value="(GMT-04:00) Atlantic Time (Canada)">
                (GMT-04:00) Atlantic Time (Canada)
              </option>
              <option value="(GMT-04:00) Caracas, La Paz">
                (GMT-04:00) Caracas, La Paz
              </option>
              <option value="(GMT-04:00) Manaus">(GMT-04:00) Manaus</option>
              <option value="(GMT-04:00) Santiago">(GMT-04:00) Santiago</option>
              <option value="(GMT-03:30) Newfoundland">
                (GMT-03:30) Newfoundland
              </option>
              <option value="(GMT-03:00) Brasilia">(GMT-03:00) Brasilia</option>
              <option value="(GMT-03:00) Buenos Aires, Georgetown">
                (GMT-03:00) Buenos Aires, Georgetown
              </option>
              <option value="(GMT-03:00) Greenland">
                (GMT-03:00) Greenland
              </option>
              <option value="(GMT-03:00) Montevideo">
                (GMT-03:00) Montevideo
              </option>
              <option value="(GMT-02:00) Mid-Atlantic">
                (GMT-02:00) Mid-Atlantic
              </option>
              <option value="(GMT-01:00) Cape Verde Is.">
                (GMT-01:00) Cape Verde Is.
              </option>
              <option value="(GMT-01:00) Azores">(GMT-01:00) Azores</option>
              <option value="(GMT+00:00) Casablanca, Monrovia, Reykjavik">
                (GMT+00:00) Casablanca, Monrovia, Reykjavik
              </option>
              <option value="(GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon, London">
                (GMT+00:00) Greenwich Mean Time : Dublin, Edinburgh, Lisbon,
                London
              </option>
              <option value="(GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna">
                (GMT+01:00) Amsterdam, Berlin, Bern, Rome, Stockholm, Vienna
              </option>
              <option value="(GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague">
                (GMT+01:00) Belgrade, Bratislava, Budapest, Ljubljana, Prague
              </option>
              <option value="(GMT+01:00) Brussels, Copenhagen, Madrid, Paris">
                (GMT+01:00) Brussels, Copenhagen, Madrid, Paris
              </option>
              <option value="(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb">
                (GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb
              </option>
              <option value="(GMT+01:00) West Central Africa">
                (GMT+01:00) West Central Africa
              </option>
              <option value="(GMT+02:00) Amman">(GMT+02:00) Amman</option>
              <option value="(GMT+02:00) Athens, Bucharest, Istanbul">
                (GMT+02:00) Athens, Bucharest, Istanbul
              </option>
              <option value="GMT+02:00) Beirut">(GMT+02:00) Beirut</option>
              <option value="(GMT+02:00) Cairo">(GMT+02:00) Cairo</option>
              <option value="(GMT+02:00) Harare, Pretoria">
                (GMT+02:00) Harare, Pretoria
              </option>
              <option value="(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius">
                (GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius
              </option>
              <option value="(GMT+02:00) Jerusalem">
                (GMT+02:00) Jerusalem
              </option>
              <option value="(GMT+02:00) Minsk">(GMT+02:00) Minsk</option>
              <option value="(GMT+02:00) Windhoek">(GMT+02:00) Windhoek</option>
              <option value="(GMT+03:00) Kuwait, Riyadh, Baghdad">
                (GMT+03:00) Kuwait, Riyadh, Baghdad
              </option>
              <option value="(GMT+03:00) Moscow, St. Petersburg, Volgograd">
                (GMT+03:00) Moscow, St. Petersburg, Volgograd
              </option>
              <option value="(GMT+03:00) Nairobi">(GMT+03:00) Nairobi</option>
              <option value="(GMT+03:00) Tbilisi<">(GMT+03:00) Tbilisi</option>
              <option value="(GMT+03:30) Tehran">(GMT+03:30) Tehran</option>
              <option value="(GMT+04:00) Abu Dhabi, Muscat">
                (GMT+04:00) Abu Dhabi, Muscat
              </option>
              <option value="(GMT+04:00) Baku">(GMT+04:00) Baku</option>
              <option value="(GMT+04:00) Yerevan">(GMT+04:00) Yerevan</option>
              <option value="(GMT+04:30) Kabul">(GMT+04:30) Kabul</option>
              <option value="(GMT+05:00) Yekaterinburg">
                (GMT+05:00) Yekaterinburg
              </option>
              <option value="(GMT+05:00) Islamabad, Karachi, Tashkent">
                (GMT+05:00) Islamabad, Karachi, Tashkent
              </option>
              <option value="(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi">
                (GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi
              </option>
              <option value="(GMT+05:30) Sri Jayawardenapura">
                (GMT+05:30) Sri Jayawardenapura
              </option>
              <option value="(GMT+05:45) Kathmandu">
                (GMT+05:45) Kathmandu
              </option>
              <option value="(GMT+06:00) Almaty, Novosibirsk">
                (GMT+06:00) Almaty, Novosibirsk
              </option>
              <option value="(GMT+06:00) Astana, Dhaka">
                (GMT+06:00) Astana, Dhaka
              </option>
              <option value="(GMT+06:30) Yangon (Rangoon)">
                (GMT+06:30) Yangon (Rangoon)
              </option>
              <option value="(GMT+07:00) Bangkok, Hanoi, Jakarta">
                (GMT+07:00) Bangkok, Hanoi, Jakarta
              </option>
              <option value="(GMT+07:00) Krasnoyarsk">
                (GMT+07:00) Krasnoyarsk
              </option>
              <option value="(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi">
                (GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi
              </option>
              <option value="(GMT+08:00) Kuala Lumpur, Singapore">
                (GMT+08:00) Kuala Lumpur, Singapore
              </option>
              <option value="(GMT+08:00) Irkutsk, Ulaan Bataar">
                (GMT+08:00) Irkutsk, Ulaan Bataar
              </option>
              <option value="(GMT+08:00) Perth">(GMT+08:00) Perth</option>
              <option value="(GMT+08:00) Taipei">(GMT+08:00) Taipei</option>
              <option value="(GMT+09:00) Osaka, Sapporo, Tokyo">
                (GMT+09:00) Osaka, Sapporo, Tokyo
              </option>
              <option value="(GMT+09:00) Seoul">(GMT+09:00) Seoul</option>
              <option value="(GMT+09:00) Yakutsk">(GMT+09:00) Yakutsk</option>
              <option value="(GMT+09:30) Adelaide">(GMT+09:30) Adelaide</option>
              <option value="Australia/Darwin">(GMT+09:30) Darwin</option>
              <option value="(GMT+10:00) Brisbane">(GMT+10:00) Brisbane</option>
              <option value="(GMT+10:00) Canberra, Melbourne, Sydney">
                (GMT+10:00) Canberra, Melbourne, Sydney
              </option>
              <option value="Australia/Hobart">(GMT+10:00) Hobart</option>
              <option value="(GMT+10:00) Guam, Port Moresby">
                (GMT+10:00) Guam, Port Moresby
              </option>
              <option value="(GMT+10:00) Vladivostok">
                (GMT+10:00) Vladivostok
              </option>
              <option value="(GMT+11:00) Magadan, Solomon Is., New Caledonia">
                (GMT+11:00) Magadan, Solomon Is., New Caledonia
              </option>
              <option value="(GMT+12:00) Auckland, Wellington">
                (GMT+12:00) Auckland, Wellington
              </option>
              <option value="(GMT+12:00) Fiji, Kamchatka, Marshall Is.">
                (GMT+12:00) Fiji, Kamchatka, Marshall Is.
              </option>
              <option value="(GMT+13:00) Nuku'alofa">
                (GMT+13:00) Nuku'alofa
              </option>
            </select>
            <br />
            <br />
            <label>Language</label>
            <br />
            <select
              onChange={this.languageChange}
              value={this.state.language}
              id="language"
              name="language"
            >
              <option value="Afrikaans">Afrikaans</option>
              <option value="Albanian">Albanian</option>
              <option value="Arabic">Arabic</option>
              <option value="Armenian">Armenian</option>
              <option value="Basque">Basque</option>
              <option value="Bengali">Bengali</option>
              <option value="Bulgarian">Bulgarian</option>
              <option value="Catalan">Catalan</option>
              <option value="Cambodian">Cambodian</option>
              <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
              <option value="Croatian">Croatian</option>
              <option value="Czech">Czech</option>
              <option value="Danish">Danish</option>
              <option value="Dutch">Dutch</option>
              <option value="English">English</option>
              <option value="Estonian">Estonian</option>
              <option value="Fiji">Fiji</option>
              <option value="Finnish">Finnish</option>
              <option value="French">French</option>
              <option value="Georgian">Georgian</option>
              <option value="German">German</option>
              <option value="Greek">Greek</option>
              <option value="Gujarati">Gujarati</option>
              <option value="Hebrew">Hebrew</option>
              <option value="Hindi">Hindi</option>
              <option value="Hungarian">Hungarian</option>
              <option value="Icelandic">Icelandic</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Irish">Irish</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Javanese">Javanese</option>
              <option value="Korean">Korean</option>
              <option value="Latin">Latin</option>
              <option value="Latvian">Latvian</option>
              <option value="Lithuanian">Lithuanian</option>
              <option value="Macedonian">Macedonian</option>
              <option value="Malay">Malay</option>
              <option value="Malayalam">Malayalam</option>
              <option value="Maltese">Maltese</option>
              <option value="Maori">Maori</option>
              <option value="Marathi">Marathi</option>
              <option value="Mongolian">Mongolian</option>
              <option value="Nepali">Nepali</option>
              <option value="Norwegian">Norwegian</option>
              <option value="Persian">Persian</option>
              <option value="Polish">Polish</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Punjabi">Punjabi</option>
              <option value="Quechua">Quechua</option>
              <option value="Romanian">Romanian</option>
              <option value="Russian">Russian</option>
              <option value="Samoan">Samoan</option>
              <option value="Serbian">Serbian</option>
              <option value="Slovak">Slovak</option>
              <option value="Slovenian">Slovenian</option>
              <option value="Spanish">Spanish</option>
              <option value="Swahili">Swahili</option>
              <option value="Swedish ">Swedish </option>
              <option value="Tamil">Tamil</option>
              <option value="Tatar">Tatar</option>
              <option value="Telugu">Telugu</option>
              <option value="Thai">Thai</option>
              <option value="Tibetan">Tibetan</option>
              <option value="Tonga">Tonga</option>
              <option value="Turkish">Turkish</option>
              <option value="Ukrainian">Ukrainian</option>
              <option value="Urdu">Urdu</option>
              <option value="Uzbek">Uzbek</option>
              <option value="Vietnamese">Vietnamese</option>
              <option value="Welsh">Welsh</option>
              <option value="Xhosa">Xhosa</option>
            </select>
          </div>
        </div>
        <button type="button" className="save" onClick={this.save}>
          Save
        </button>
      </div>
    );
  }
}

export default Profile;
