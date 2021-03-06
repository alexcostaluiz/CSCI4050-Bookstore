import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

import { Select } from 'antd';

function CountrySelect(props) {
  const { name = 'country', onChange } = props;

  const select = useRef(null);

  useEffect(() => {
    const input = ReactDOM.findDOMNode(select.current).querySelector(
      '.ant-select-selection-search-input'
    );
    input.autocomplete = 'nope';
  }, []);

  return (
    <Select
      name={name}
      placeholder='Select Country'
      onChange={onChange}
      ref={select}
      showSearch
      allowClear>
      <Select.Option value='Afganistan'>Afghanistan</Select.Option>
      <Select.Option value='Albania'>Albania</Select.Option>
      <Select.Option value='Algeria'>Algeria</Select.Option>
      <Select.Option value='American Samoa'>American Samoa</Select.Option>
      <Select.Option value='Andorra'>Andorra</Select.Option>
      <Select.Option value='Angola'>Angola</Select.Option>
      <Select.Option value='Anguilla'>Anguilla</Select.Option>
      <Select.Option value='Antigua/Barbuda'>Antigua/Barbuda</Select.Option>
      <Select.Option value='Argentina'>Argentina</Select.Option>
      <Select.Option value='Armenia'>Armenia</Select.Option>
      <Select.Option value='Aruba'>Aruba</Select.Option>
      <Select.Option value='Australia'>Australia</Select.Option>
      <Select.Option value='Austria'>Austria</Select.Option>
      <Select.Option value='Azerbaijan'>Azerbaijan</Select.Option>
      <Select.Option value='Bahamas'>Bahamas</Select.Option>
      <Select.Option value='Bahrain'>Bahrain</Select.Option>
      <Select.Option value='Bangladesh'>Bangladesh</Select.Option>
      <Select.Option value='Barbados'>Barbados</Select.Option>
      <Select.Option value='Belarus'>Belarus</Select.Option>
      <Select.Option value='Belgium'>Belgium</Select.Option>
      <Select.Option value='Belize'>Belize</Select.Option>
      <Select.Option value='Benin'>Benin</Select.Option>
      <Select.Option value='Bermuda'>Bermuda</Select.Option>
      <Select.Option value='Bhutan'>Bhutan</Select.Option>
      <Select.Option value='Bolivia'>Bolivia</Select.Option>
      <Select.Option value='Bonaire'>Bonaire</Select.Option>
      <Select.Option value='Bosnia/Herzegovina'>
        Bosnia/Herzegovina
      </Select.Option>
      <Select.Option value='Botswana'>Botswana</Select.Option>
      <Select.Option value='Brazil'>Brazil</Select.Option>
      <Select.Option value='British Indian Ocean Ter'>
        British Indian Ocean Ter
      </Select.Option>
      <Select.Option value='Brunei'>Brunei</Select.Option>
      <Select.Option value='Bulgaria'>Bulgaria</Select.Option>
      <Select.Option value='Burkina Faso'>Burkina Faso</Select.Option>
      <Select.Option value='Burundi'>Burundi</Select.Option>
      <Select.Option value='Cambodia'>Cambodia</Select.Option>
      <Select.Option value='Cameroon'>Cameroon</Select.Option>
      <Select.Option value='Canada'>Canada</Select.Option>
      <Select.Option value='Canary Islands'>Canary Islands</Select.Option>
      <Select.Option value='Cape Verde'>Cape Verde</Select.Option>
      <Select.Option value='Cayman Islands'>Cayman Islands</Select.Option>
      <Select.Option value='Central African Republic'>
        Central African Republic
      </Select.Option>
      <Select.Option value='Chad'>Chad</Select.Option>
      <Select.Option value='Channel Islands'>Channel Islands</Select.Option>
      <Select.Option value='Chile'>Chile</Select.Option>
      <Select.Option value='China'>China</Select.Option>
      <Select.Option value='Christmas Island'>Christmas Island</Select.Option>
      <Select.Option value='Cocos Island'>Cocos Island</Select.Option>
      <Select.Option value='Colombia'>Colombia</Select.Option>
      <Select.Option value='Comoros'>Comoros</Select.Option>
      <Select.Option value='Congo'>Congo</Select.Option>
      <Select.Option value='Cook Islands'>Cook Islands</Select.Option>
      <Select.Option value='Costa Rica'>Costa Rica</Select.Option>
      <Select.Option value='Cote DIvoire'>Cote DIvoire</Select.Option>
      <Select.Option value='Croatia'>Croatia</Select.Option>
      <Select.Option value='Cuba'>Cuba</Select.Option>
      <Select.Option value='Curaco'>Curacao</Select.Option>
      <Select.Option value='Cyprus'>Cyprus</Select.Option>
      <Select.Option value='Czech Republic'>Czech Republic</Select.Option>
      <Select.Option value='Denmark'>Denmark</Select.Option>
      <Select.Option value='Djibouti'>Djibouti</Select.Option>
      <Select.Option value='Dominica'>Dominica</Select.Option>
      <Select.Option value='Dominican Republic'>
        Dominican Republic
      </Select.Option>
      <Select.Option value='East Timor'>East Timor</Select.Option>
      <Select.Option value='Ecuador'>Ecuador</Select.Option>
      <Select.Option value='Egypt'>Egypt</Select.Option>
      <Select.Option value='El Salvador'>El Salvador</Select.Option>
      <Select.Option value='Equatorial Guinea'>Equatorial Guinea</Select.Option>
      <Select.Option value='Eritrea'>Eritrea</Select.Option>
      <Select.Option value='Estonia'>Estonia</Select.Option>
      <Select.Option value='Ethiopia'>Ethiopia</Select.Option>
      <Select.Option value='Falkland Islands'>Falkland Islands</Select.Option>
      <Select.Option value='Faroe Islands'>Faroe Islands</Select.Option>
      <Select.Option value='Fiji'>Fiji</Select.Option>
      <Select.Option value='Finland'>Finland</Select.Option>
      <Select.Option value='France'>France</Select.Option>
      <Select.Option value='French Guiana'>French Guiana</Select.Option>
      <Select.Option value='French Polynesia'>French Polynesia</Select.Option>
      <Select.Option value='French Southern Ter'>
        French Southern Ter
      </Select.Option>
      <Select.Option value='Gabon'>Gabon</Select.Option>
      <Select.Option value='Gambia'>Gambia</Select.Option>
      <Select.Option value='Georgia'>Georgia</Select.Option>
      <Select.Option value='Germany'>Germany</Select.Option>
      <Select.Option value='Ghana'>Ghana</Select.Option>
      <Select.Option value='Gibraltar'>Gibraltar</Select.Option>
      <Select.Option value='Great Britain'>Great Britain</Select.Option>
      <Select.Option value='Greece'>Greece</Select.Option>
      <Select.Option value='Greenland'>Greenland</Select.Option>
      <Select.Option value='Grenada'>Grenada</Select.Option>
      <Select.Option value='Guadeloupe'>Guadeloupe</Select.Option>
      <Select.Option value='Guam'>Guam</Select.Option>
      <Select.Option value='Guatemala'>Guatemala</Select.Option>
      <Select.Option value='Guinea'>Guinea</Select.Option>
      <Select.Option value='Guyana'>Guyana</Select.Option>
      <Select.Option value='Haiti'>Haiti</Select.Option>
      <Select.Option value='Hawaii'>Hawaii</Select.Option>
      <Select.Option value='Honduras'>Honduras</Select.Option>
      <Select.Option value='Hong Kong'>Hong Kong</Select.Option>
      <Select.Option value='Hungary'>Hungary</Select.Option>
      <Select.Option value='Iceland'>Iceland</Select.Option>
      <Select.Option value='Indonesia'>Indonesia</Select.Option>
      <Select.Option value='India'>India</Select.Option>
      <Select.Option value='Iran'>Iran</Select.Option>
      <Select.Option value='Iraq'>Iraq</Select.Option>
      <Select.Option value='Ireland'>Ireland</Select.Option>
      <Select.Option value='Isle of Man'>Isle of Man</Select.Option>
      <Select.Option value='Israel'>Israel</Select.Option>
      <Select.Option value='Italy'>Italy</Select.Option>
      <Select.Option value='Jamaica'>Jamaica</Select.Option>
      <Select.Option value='Japan'>Japan</Select.Option>
      <Select.Option value='Jordan'>Jordan</Select.Option>
      <Select.Option value='Kazakhstan'>Kazakhstan</Select.Option>
      <Select.Option value='Kenya'>Kenya</Select.Option>
      <Select.Option value='Kiribati'>Kiribati</Select.Option>
      <Select.Option value='Korea North'>Korea North</Select.Option>
      <Select.Option value='Korea Sout'>Korea South</Select.Option>
      <Select.Option value='Kuwait'>Kuwait</Select.Option>
      <Select.Option value='Kyrgyzstan'>Kyrgyzstan</Select.Option>
      <Select.Option value='Laos'>Laos</Select.Option>
      <Select.Option value='Latvia'>Latvia</Select.Option>
      <Select.Option value='Lebanon'>Lebanon</Select.Option>
      <Select.Option value='Lesotho'>Lesotho</Select.Option>
      <Select.Option value='Liberia'>Liberia</Select.Option>
      <Select.Option value='Libya'>Libya</Select.Option>
      <Select.Option value='Liechtenstein'>Liechtenstein</Select.Option>
      <Select.Option value='Lithuania'>Lithuania</Select.Option>
      <Select.Option value='Luxembourg'>Luxembourg</Select.Option>
      <Select.Option value='Macau'>Macau</Select.Option>
      <Select.Option value='Macedonia'>Macedonia</Select.Option>
      <Select.Option value='Madagascar'>Madagascar</Select.Option>
      <Select.Option value='Malaysia'>Malaysia</Select.Option>
      <Select.Option value='Malawi'>Malawi</Select.Option>
      <Select.Option value='Maldives'>Maldives</Select.Option>
      <Select.Option value='Mali'>Mali</Select.Option>
      <Select.Option value='Malta'>Malta</Select.Option>
      <Select.Option value='Marshall Islands'>Marshall Islands</Select.Option>
      <Select.Option value='Martinique'>Martinique</Select.Option>
      <Select.Option value='Mauritania'>Mauritania</Select.Option>
      <Select.Option value='Mauritius'>Mauritius</Select.Option>
      <Select.Option value='Mayotte'>Mayotte</Select.Option>
      <Select.Option value='Mexico'>Mexico</Select.Option>
      <Select.Option value='Midway Islands'>Midway Islands</Select.Option>
      <Select.Option value='Moldova'>Moldova</Select.Option>
      <Select.Option value='Monaco'>Monaco</Select.Option>
      <Select.Option value='Mongolia'>Mongolia</Select.Option>
      <Select.Option value='Montserrat'>Montserrat</Select.Option>
      <Select.Option value='Morocco'>Morocco</Select.Option>
      <Select.Option value='Mozambique'>Mozambique</Select.Option>
      <Select.Option value='Myanmar'>Myanmar</Select.Option>
      <Select.Option value='Nambia'>Nambia</Select.Option>
      <Select.Option value='Nauru'>Nauru</Select.Option>
      <Select.Option value='Nepal'>Nepal</Select.Option>
      <Select.Option value='Netherland Antilles'>
        Netherland Antilles
      </Select.Option>
      <Select.Option value='Netherlands'>
        Netherlands (Holland, Europe)
      </Select.Option>
      <Select.Option value='Nevis'>Nevis</Select.Option>
      <Select.Option value='New Caledonia'>New Caledonia</Select.Option>
      <Select.Option value='New Zealand'>New Zealand</Select.Option>
      <Select.Option value='Nicaragua'>Nicaragua</Select.Option>
      <Select.Option value='Niger'>Niger</Select.Option>
      <Select.Option value='Nigeria'>Nigeria</Select.Option>
      <Select.Option value='Niue'>Niue</Select.Option>
      <Select.Option value='Norfolk Island'>Norfolk Island</Select.Option>
      <Select.Option value='Norway'>Norway</Select.Option>
      <Select.Option value='Oman'>Oman</Select.Option>
      <Select.Option value='Pakistan'>Pakistan</Select.Option>
      <Select.Option value='Palau Island'>Palau Island</Select.Option>
      <Select.Option value='Palestine'>Palestine</Select.Option>
      <Select.Option value='Panama'>Panama</Select.Option>
      <Select.Option value='Papua New Guinea'>Papua New Guinea</Select.Option>
      <Select.Option value='Paraguay'>Paraguay</Select.Option>
      <Select.Option value='Peru'>Peru</Select.Option>
      <Select.Option value='Phillipines'>Philippines</Select.Option>
      <Select.Option value='Pitcairn Island'>Pitcairn Island</Select.Option>
      <Select.Option value='Poland'>Poland</Select.Option>
      <Select.Option value='Portugal'>Portugal</Select.Option>
      <Select.Option value='Puerto Rico'>Puerto Rico</Select.Option>
      <Select.Option value='Qatar'>Qatar</Select.Option>
      <Select.Option value='Republic of Montenegro'>
        Republic of Montenegro
      </Select.Option>
      <Select.Option value='Republic of Serbia'>
        Republic of Serbia
      </Select.Option>
      <Select.Option value='Reunion'>Reunion</Select.Option>
      <Select.Option value='Romania'>Romania</Select.Option>
      <Select.Option value='Russia'>Russia</Select.Option>
      <Select.Option value='Rwanda'>Rwanda</Select.Option>
      <Select.Option value='St Barthelemy'>St Barthelemy</Select.Option>
      <Select.Option value='St Eustatius'>St Eustatius</Select.Option>
      <Select.Option value='St Helena'>St Helena</Select.Option>
      <Select.Option value='St Kitts-Nevis'>St Kitts-Nevis</Select.Option>
      <Select.Option value='St Lucia'>St Lucia</Select.Option>
      <Select.Option value='St Maarten'>St Maarten</Select.Option>
      <Select.Option value='St Pierre/Miquelon'>
        St Pierre/Miquelon
      </Select.Option>
      <Select.Option value='St Vincent/Grenadines'>
        St Vincent/Grenadines
      </Select.Option>
      <Select.Option value='Saipan'>Saipan</Select.Option>
      <Select.Option value='Samoa'>Samoa</Select.Option>
      <Select.Option value='Samoa American'>Samoa American</Select.Option>
      <Select.Option value='San Marino'>San Marino</Select.Option>
      <Select.Option value='Sao Tome/Principe'>Sao Tome/Principe</Select.Option>
      <Select.Option value='Saudi Arabia'>Saudi Arabia</Select.Option>
      <Select.Option value='Senegal'>Senegal</Select.Option>
      <Select.Option value='Seychelles'>Seychelles</Select.Option>
      <Select.Option value='Sierra Leone'>Sierra Leone</Select.Option>
      <Select.Option value='Singapore'>Singapore</Select.Option>
      <Select.Option value='Slovakia'>Slovakia</Select.Option>
      <Select.Option value='Slovenia'>Slovenia</Select.Option>
      <Select.Option value='Solomon Islands'>Solomon Islands</Select.Option>
      <Select.Option value='Somalia'>Somalia</Select.Option>
      <Select.Option value='South Africa'>South Africa</Select.Option>
      <Select.Option value='Spain'>Spain</Select.Option>
      <Select.Option value='Sri Lanka'>Sri Lanka</Select.Option>
      <Select.Option value='Sudan'>Sudan</Select.Option>
      <Select.Option value='Suriname'>Suriname</Select.Option>
      <Select.Option value='Swaziland'>Swaziland</Select.Option>
      <Select.Option value='Sweden'>Sweden</Select.Option>
      <Select.Option value='Switzerland'>Switzerland</Select.Option>
      <Select.Option value='Syria'>Syria</Select.Option>
      <Select.Option value='Tahiti'>Tahiti</Select.Option>
      <Select.Option value='Taiwan'>Taiwan</Select.Option>
      <Select.Option value='Tajikistan'>Tajikistan</Select.Option>
      <Select.Option value='Tanzania'>Tanzania</Select.Option>
      <Select.Option value='Thailand'>Thailand</Select.Option>
      <Select.Option value='Togo'>Togo</Select.Option>
      <Select.Option value='Tokelau'>Tokelau</Select.Option>
      <Select.Option value='Tonga'>Tonga</Select.Option>
      <Select.Option value='Trinidad/Tobago'>Trinidad/Tobago</Select.Option>
      <Select.Option value='Tunisia'>Tunisia</Select.Option>
      <Select.Option value='Turkey'>Turkey</Select.Option>
      <Select.Option value='Turkmenistan'>Turkmenistan</Select.Option>
      <Select.Option value='Turks/Caicos Is'>Turks/Caicos Is</Select.Option>
      <Select.Option value='Tuvalu'>Tuvalu</Select.Option>
      <Select.Option value='Uganda'>Uganda</Select.Option>
      <Select.Option value='United Kingdom'>United Kingdom</Select.Option>
      <Select.Option value='Ukraine'>Ukraine</Select.Option>
      <Select.Option value='United Arab Erimates'>
        United Arab Emirates
      </Select.Option>
      <Select.Option value='United States'>United States</Select.Option>
      <Select.Option value='Uraguay'>Uruguay</Select.Option>
      <Select.Option value='Uzbekistan'>Uzbekistan</Select.Option>
      <Select.Option value='Vanuatu'>Vanuatu</Select.Option>
      <Select.Option value='Vatican City State'>
        Vatican City State
      </Select.Option>
      <Select.Option value='Venezuela'>Venezuela</Select.Option>
      <Select.Option value='Vietnam'>Vietnam</Select.Option>
      <Select.Option value='Virgin Islands (Brit)'>
        Virgin Islands (Brit)
      </Select.Option>
      <Select.Option value='Virgin Islands (USA)'>
        Virgin Islands (USA)
      </Select.Option>
      <Select.Option value='Wake Island'>Wake Island</Select.Option>
      <Select.Option value='Wallis/Futana Is'>Wallis/Futana Is</Select.Option>
      <Select.Option value='Yemen'>Yemen</Select.Option>
      <Select.Option value='Zaire'>Zaire</Select.Option>
      <Select.Option value='Zambia'>Zambia</Select.Option>
      <Select.Option value='Zimbabwe'>Zimbabwe</Select.Option>
    </Select>
  );
}

export default CountrySelect;
