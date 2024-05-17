define([], function () {
  return {
    "PropertyPaneDescription": "",
    "sicGroupName": "Request Form Configuration",
    "DescriptionFieldLabel": "Description Field",
    "RequestTypeFieldLabel": "Request Type",
    "RequestType": ['Legal Client Creation - Ad Hoc', 'Legal Client Creation - Contact Company Conversion', 'Parent Client Creation', 'Legal Client Update', 'Parent Client Update', 'Company Specific Client Update', 'Legal Client Creation With Different Currency'], //rutvik task 6
    "RequestSections": ['Company', 'Due Diligence Checklist', 'Duplication Check', 'Client Details', 'Tax & Legal Details', 'Attachments', 'Company', 'Company & Parent Client', 'Assign Clients'],

    "ClientUpdateSections": ['Company', 'Client Details', 'Attachments'],
    "CompanyClientUpdateSections": ['Company', 'Client Details', 'Tax Information', 'Attachments'],
    "ClientCreaionWithCurrency": ['Company', 'Client Details', 'Attachments'], //rutvik task 6

    "BtnNextText": "Next",
    "BtnBackText": "Back",
    "BtnCancelText": "Exit", //shraddha task 12
    "BtnDeleteText": "Delete Selected Documents",
    "BtnSaveForLaterText": "Save for later",
    "BtnSubmitText": "Submit",
    "BtnSaveItemText": "Save",
    "Sec1Question": "Which Legal Entity will be contracting with this Client?",
    "ReqType_TXT": "Please select your Request Type",
    "WorkflowType": ["Standard", "Emergency"],
    "Status": ["Open", "Closed"],
    "CompanyFieldLabel": "Company",
    "CantLeaveBlankMsg": "You can't leave this blank.",
    "SelectAnyOptionMsg": "Please select any option.",
    "Section3Title": "Please Provide Client Information & Contact Details",
    "Section2Title": "Please Check If Any Duplicate Details Already Exists",

    "Section4Title": "Please provide tax,payment and legal (country specific) details",
    "Lbl_CancelRequest": "Cancel Request",

    "NoRecordsAvailable": "No records are available.",
    "Datanotfound": "Data Not Found.",
    "InvalidPermissionMsg": "You don't have enough permissions to add/edit this request.",
    "DeleteConfirmationRequest": "Are you sure you want to cancel this request?",
    "dpPlaceHolder": "Select",

    "Req8_GridHeader": ["Action", "Contact Company No.", "Social Name", "Country", "Client Contact Name", "Phone", "Email", "Client Relationship Manager", "Sector", "Client Status", "Client Type"],
    "Valid_Req8GridMsg": "Please select any contact company from the table.",
    "Lbl_SelectCompanyContact": "Please select the contact company you would like to convert into a client from below table",
    "Valid_Req8_Submit": "The approval request for same company client is already in process.",

    "Lbl_ContactCompany": "Contact Company",
    "Lbl_ContactCompanyNo": "Contact Company No.",
    "Lbl_Name": "Name",
    "Lbl_SocialName": "Social Name",
    "Lbl_LegalName": "Legal Name",
    "Lbl_LegalNameInArabic": "Legal Name In Arabic", //rutvik 13-3-24
    "Lbl_Address": "Address",
    "Lbl_Line1": "Line 1",
    "Lbl_Line2": "Line 2",
    "Lbl_ZipCode": "Zip Code",
    "Lbl_Postal": "Postal District/City",
    "Lbl_CountryArea": "County/Area/Region",
    //rutvik 13-3-24
    "Lbl_ArabicAddress": "Arabic Address",
    "Lbl_ArabicLine1": "Arabic Line 1",
    "Lbl_ArabicLine2": "Arabic Line 2",
    // "Lbl_ArabicZipCode": "Arabic Zip Code",
    "Lbl_ArabicPostal": "Arabic Postal District/City",
    "Lbl_ArabicCountryArea": "Arabic County/Area/Region",
    //end
    "Lbl_Country": "Country",
    "Lbl_ContactDetails": "Contact Details",
    "Lbl_ClientAttentionName": "Client Attention Name",
    "Lbl_EmailAddress": "Client Attention Email Address", //rutvik 28-3-24 modified - add client attention
    "Lbl_PhoneNo": "Phone No",
    "Lbl_GeneralInfo": "General Information",
    "Lbl_Currency": "Currency",
    "Lbl_CompanyRegNo": "Company Registration No",
    "Lbl_Sector": "Sector",
    "Lbl_ClientStatus": "Client Status",
    "Lbl_ClientType": "Client Type",
    "Valid_EmailAddress": "Enter valid Email Address.",
    "Valid_PhoneNo": "Enter valid Phone No.",
    "Lbl_TaxInformation": "Tax Information",
    "Lbl_TaxRegNo": "Tax Registration No",
    "Lbl_DefaultTaxCode": "Default Tax Code",
    "Lbl_PaymentInformation": "Payment Information",
    "Lbl_PaymentTerms": "Payment Terms",
    "Lbl_Billing": "Billing",
    //rutvik 4-7 24    
    "Lbl_ItalianInvoiceExtension": "Italian Invoice Extension",
    "Lbl_CustomerRemark4": "Codice Di Interscambio",
    "Lbl_CustomerRemark5": "Posta Electronica Certificata Destinatario",
    //endr
    "Lbl_Instructions": "Instructions",
    "Lbl_DeliveryMethod": "Delivery Method",
    "Lbl_PaymentMode": "Payment Mode",
    "Lbl_BeneficiaryAccName": "Beneficiary Account Name",
    "Lbl_IBAN": "IBAN",
    "Lbl_SwiftBIC": "SWIFT/BIC",
    "Lbl_BankAccNo": "Bank Account No",
    "Lbl_SortCode": "Sort Code / ABA / Routing No",
    "Lbl_PaymentTransID": "Payment Transaction ID",
    "Lbl_GulfSpecInfo": "Gulf Specific Information",
    "Lbl_WithHoldingTax": "Withholding Tax Type",
    "Lbl_Emirate": "Emirate",
    "Lbl_IndiaSpecInfo": "India Specific Information",
    "Lbl_PlaceOfSupply": "Place of Supply",
    "Lbl_GSTRegType": "GST Registration Type",
    "Lbl_CIN": "CIN",
    "Lbl_TDSRate": "TDS Rate %",

    "AttachmentTitle": "Please attach your documents",
    "DocumentNameHeader": "Document Name",
    "DocumentDescriptionHeader": "Document Description",
    "DocumentTypeHeader": "Document Type",
    "DocumentSizeHeader": "Document Size (Mb)",
    "DeleteHeader": "Delete",
    "BtnAddDocumentText": "Add Document",
    "lblDocument": "Document",
    "lblDescription": "Description",
    "DialogBtnSaveText": "Save",
    "DialogBtnCancelText": "Cancel",
    "NoRecordsAvailable": "No records found",
    "DeleteConfirmMsg": "Are you sure want to delete this document(s)?",
    "FileOverrideConfirmMsg": "File with same name is already exist. Are you sure want to override this file?",
    "ApprovalNotFoundMsg": "There is no approver set for this request type. Kindly contact to site admin for the same.",
    "ApprovalStatus": ["Pending", "Not Due", "Approved", "Rejected"],
    "DuplicationcheckHeader": ["Maconomy ID", "Social Name", "Legal Name", "Address Line 1", "Address Line 2", "Zip Code", "Postal Disctrict/City", "Country", "Currency", "Tax Reg. No.", "Status"],
    "Valid_Filesize": "File size should be less than 5 MB.",
    "Valid_FileType": "File of this type is not allowed.",
    "Jpg_File_Not_Allowed": "jpg files are not allowed, please save the file as a jpeg file and try again.", //rutvik 10-5-24
    "NoRecordMSG": "No records are available.",
    "Grid_LinkHeader": "Link",
    "AccessLevelHeader": "Group", //Rutvik 17-1-24
    "YouHaveSelectedText": "You have selected: ",
    "Grid_TypeHeader": "Type",
    "ActionHeader": "Action",
    "SelectClientMsg": "Please select any client from the table.",
    "Section3TaxInformationTitle": "Please provide tax details",
    "EmptyData": "-",
    "Lbl_MaconomyClientNo": "Maconomy Client No.",
    "NoUpdateMsg": "Please edit any of the field data to submit request.",
    "ValiateReq9Submit": "Selected client already child of other.",

    // Request 9 - Parent client creation
    "Request9Sections": ['Company', 'Duplication Check', 'Assign Clients'],
    "AvailableClients": "Available Clients",
    "AssignedClients": "Assigned Clients",
    "Valid_Req_Submit_SelectedClients": "These are the clients already selected in other requests being processed. Clients:",
    "SelectClientsForParentClient": "Please select clients for Parent client creation",

    // Request 11 - Parent client update
    "Request11Sections": ['Company', 'Assign Clients'],
    "Valid_Req11_InProcess": "The update request for same client is already in process.",
    "NoChildUpdate": "This request cannot be submitted as there is no changes found with current client",
    "Lbl_SelectClientGrid": "Please select the client you would like to update from below table",
    "Valid_ClientExist": "The client being requested is already exist.",
    "UpdateFields_Title": "Please update fields you require to change",
    "Lbl_ChooseFile": "Choose file",
    "CurrentValue": "Current Values",
    "NewValue": "New Values",
    "SelectCompanyClientMsg": "Please select any company client from the table.",
    "Lbl_SelectCompanyClientGrid": "Please select the company specific client you would like to update from below table",

    // Attachment message
    "NoDocumentsAddedMsg": "Please add at least one document to submit the request.",

    // Request 10
    "ClientRequest_RunningMode": ['The request for the selected client can not be saved. There are other requests with Request ID: ', ' in approval process for the selected client.'],
    "NoMaconomyData_Msg": "The request made for client no longer exist in maconomy.",

    // Request 12
    "ClientRequest_RunningModeReq12": ['The request for the selected client and company can not be saved. There are other requests with Request ID: ', ' in approval process for the selected client and company.'],
    "CompanyClient_NotExists": "Company clients does not exist for selected company.",

    // Property Pane lable
    "Lbl_SENDNOTIFICATIONS_MSFLOW_URL": "Send Notification MSFlow Url",
    "Lbl_PERMISSION_MSFLOW_URL": "Permission MSFlow Url",
    "Lbl_COPYFILESFLOW_URL": "Copy Files Flow Url",


    "NoMaconomyClient_Msg": ["The request made for client ", " no longer exist in maconomy."],
    "NoMaconomyParentClient_Msg": ["The request made for parent client ", " no longer exist in maconomy."],
    "NoMaconomyCompanyClient_Msg": ["The request made for company client ", " no longer exist in maconomy."],
    "NoMaconomyContactCompanyClient_Msg": ["The request made for contact company ", " no longer exist in maconomy."],
    "NoCompany_Msg": ["The request made for company ", " no longer exist."],

    "DueDiligenceTitle": "Due Diligence Checks",

    "invalidAccessLevel": "You don't have Access Level to add/edit this request. Please contact your admin.",

    //shraddha task 10
    "InvalidFileNameMsg": "Invalid File Name",

    //rutvik task 6
    "ClientAlreadyExist": "A Client account already exist for client : ",
    "CompanyClientAlreadyExist": "A company client account already exist for client : ",
    "ClientInProgressString1": "The request for selected client and currency can not be saved. There are other request with client",
    "ClientInProgressString2": " in approval process for the selected client and currency",

    "MessageText1": "If you need any guidance on this request type, please",
    "MessageText2": "for a link to the training materials where you can find both video and step by step guides.",
    "TraningMaterialLink": "https://apcoworldwide.sharepoint.com/sites/MaconomySupport/SitePages/Maconomy--MasterDataManagementTool.aspx",
    "ClickHere": "Click here",

    "Lbl_CustomerRemark8": "Codice Destinatario",
    "Lbl_CustomerRemark7": "Client ID No.",
    "Lbl_ClientIDType": "Client ID Type",
    "Lbl_SaudiSpecificData": "KSA Specific Data",

    //rutvik task 30
    "SpecialChar": "You can't use this special character in this field ",
    "NotAllowedTwoDots": "You can't use dot(.) in file name", //dec CR

    "FileNameInEnglish": "File name must be in english language", //14-3-23 march CR #F

    //rutvik 28-3-24
    "ZipCodeValidationString": "Only number is allowed and length must be 5 digit",
    "Lbl_FinanceEmailAddress": "Finance Email Address",
    "Lbl_ExcludedFromClientInvoiceReminders": "Exclude From Client Invoice Reminder",
    "strYes": "Yes",
    "strNo": "No",

    //rutvik 25-4-2024
    "NotContainsNonASCIILatters": "Your Filename contains invalid characters (some cannot be seen) please rename the file entirely, and re-upload to the request"

  }
});