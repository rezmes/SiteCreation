import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import { ISPHttpClientOptions, SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import styles from './SiteCreationWebPart.module.scss';
import * as strings from 'SiteCreationWebPartStrings';

export interface ISiteCreationWebPartProps {
  description: string;
}

export default class SiteCreationWebPart extends BaseClientSideWebPart<ISiteCreationWebPartProps> {

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${ styles.siteCreation }">

    <h1>Create a New Subsite</h>
    <p>Please fill the below details to create a new ssubsite.</p><br/>
    Sub Site Title: <br/><input type='text' id='txtSubSiteTitle' /><br/>
    Sub Site URL: <br/><input type 'text' id ='txtSubSiteUrl' /><br/>
    Sub Site Description: <br/><textarea id='textSubSiteDescription' rows='5' cols='30' ></textarea><br/><br/>
    <input type='button' id='btnCreateSubSite" value='Create Sub Site'/><br/>

      </div>`;

      this.bindEvents();
  }

private bindEvents(): void {
  this.domElement.querySelector('#btnCreateSubSite').addEventListener('click', ()=>{this.createSubSite();});
}

private createSubSite(): void {

  let subSiteTitle = document.getElementById('txtSubSiteTitle')['value'];
  let subSiteUrl = document.getElementById('txtSubSiteUrl')['value']
  let subSiteDescription = document.getElementById('txtSubSiteDescription')['value']

  const url: string = this.context.pageContext.web.absoluteUrl+"/_api/web/webinfos/add";

  const SPHttpClientOptions: ISPHttpClientOptions = {
    body: `{
    "parameters":{
    "@odata.type"":"SP.WebInfoCreationInformation:",
    "Title": "${subSiteDescription}"
    "Language": 1033,
    "WebTemplate": "STS#0",
    "UseUniquePermissions": true
    }
    }`
  }


}


  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
