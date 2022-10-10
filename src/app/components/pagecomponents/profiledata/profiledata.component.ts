import { Router } from '@angular/router';
import { Component, ElementRef, HostListener, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { profileGeneralData } from 'app/models/profile-general-data.model';
import { ProfileDataService } from 'app/services/profileData/profileData.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe, ViewportScroller } from '@angular/common';

import { interval as observableInterval } from "rxjs";
import { takeWhile, scan, tap } from "rxjs/operators"
import { DOCUMENT } from '@angular/common'
import { DialogModelComponent } from 'app/components/dialogcomponent/dialog-model/dialog-model.component';
// import { DialogModelComponent } from 'app/dialog-model/dialog-model.component';
declare var $: any; // declaring jquery in this way solved the problem
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupComponent } from '../../commoncomponents/popup/popup.component';
export function controlContainerFactory(controlContainer?: ControlContainer) {
	return controlContainer;
}

@Component({
	selector: 'app-profiledata',
	templateUrl: './profiledata.component.html',
	styleUrls: ['./profiledata.component.css']
})


export class ProfileGeneralDataComponent implements OnInit {
	@ViewChild (DialogModelComponent) dialogBox: DialogModelComponent;
	@ViewChild('fileInput', {static: false}) fileInput: ElementRef;
	profileDetails: any = [];
	profileModel = new profileGeneralData();
	profilemodel: profileGeneralData[];
	EmployeeSizeList = ['0-100','101-1000','1001-5000','5001-10000','10000+']
	loginuser
	genders = ['male', 'female'];
	disableTextbox: boolean = true;
	hideCancel: boolean = false;

	profileData = new FormGroup({
		purchGroup: new FormControl('', Validators.required),
		plantCode: new FormControl('', Validators.required),
		title: new FormControl('', Validators.required),
		vendorName1: new FormControl('', Validators.required),
		vendorName2: new FormControl('', Validators.required),
		streetLine1: new FormControl('', Validators.required),
		streetLine2: new FormControl('', Validators.required),
		streetLine3: new FormControl('', Validators.required),
		streetLine4: new FormControl('', Validators.required),
		postalCode: new FormControl('', Validators.required),
		countryKey: new FormControl('', Validators.required),
		region: new FormControl('', Validators.required),
		city: new FormControl('', Validators.required),
		telephoneNo: new FormControl('', Validators.required),
		mobileNo: new FormControl('', Validators.required),
		faxNo: new FormControl('', Validators.required),
		vendorEmail: new FormControl('', Validators.required)
	});
	bankingData = new FormGroup({
		bankName: new FormControl('', Validators.required),
		branch: new FormControl('', Validators.required),
		bankAccountNo: new FormControl('', Validators.required),
		swiftCode: new FormControl('', Validators.required),
		ifscNo: new FormControl('', Validators.required),
		pfRegisterationNo: new FormControl('', Validators.required),
		ESICRegisterationNo: new FormControl('', Validators.required),
		VATRegisterationNo: new FormControl('', Validators.required),
		panNo: new FormControl('', Validators.required),
		serviceTaxRegisterationNo: new FormControl('', Validators.required),
		CSTNo: new FormControl('', Validators.required),
		LSTNo: new FormControl('', Validators.required),
		GSTRegisterationNo: new FormControl('', Validators.required),
		taxClassification: new FormControl('', Validators.required),
		TDSExcemptionNo: new FormControl('', Validators.required),
		excemptionPercentage: new FormControl('', Validators.required),
		excemptFrom: new FormControl('', Validators.required),
		excemptTo: new FormControl('', Validators.required),
		MSMEStatus: new FormControl('', Validators.required),
		MSMENo: new FormControl('', Validators.required),
	})

	businessData = new FormGroup({
		businessType: new FormControl('', Validators.required),
		industryType: new FormControl('', Validators.required),
		promoters: new FormControl('', Validators.required),
		// top5Clients: new FormControl('', Validators.required),
		turnOver: new FormControl('', Validators.required),
		clientRef: new FormControl('', Validators.required),
		complianceCategory: new FormControl('', Validators.required),
		constitutionBus: new FormControl('', Validators.required),
		// fileUpload: new FormControl('', Validators.required),
		
	});

	organizationData = new FormGroup({
		companyName: new FormControl('', Validators.required),
		parentCompany: new FormControl('', Validators.required),
		globalHeadOffice: new FormControl('', Validators.required),
		IndiaHeadOffice: new FormControl('', Validators.required),
		website: new FormControl('', Validators.required),
		manufacturingSite: new FormControl('', Validators.required),
		mfgCapacity: new FormControl('', Validators.required),
		yearofEshtablihsment: new FormControl('', Validators.required),
		companyDescription: new FormControl('', Validators.required),
		BnC_Category: new FormControl('', Validators.required),
		Material_Service_Provider: new FormControl('', Validators.required),
		revenueLY: new FormControl('', Validators.required),
		PATLY: new FormControl('', Validators.required),
		LYSpend: new FormControl('', Validators.required),
		EmployeeSize: new FormControl('', Validators.required),
		NameL1: new FormControl('', Validators.required),
		emailIDL1: new FormControl('', Validators.required),
		contactNoL1: new FormControl('', Validators.required),
		nameL2: new FormControl('', Validators.required),
		emailIDL2: new FormControl('', Validators.required),
		contactNoL2: new FormControl('', Validators.required),
		BCCLAssociation: new FormControl('', Validators.required),
		BCCLannualSpend: new FormControl('', Validators.required),
		groupCO: new FormControl('', Validators.required),
		marketUpdate: new FormControl('', Validators.required),
		top5Clients: new FormControl('', Validators.required),
		UploadPortfolio: new FormControl(''),
	})
	model: any = {};
	date: any;
	pageYoffset = 0;
	viewAttachmentName: string="";
	viewUploadFile: any;
	AttachmentValidExtension: any = [
		"PDF",

	];
	fileAttachmentError: string;
	confile: File;
	Vendor_ID1: any;
	disableCancel: boolean = false
	iconSelected: boolean = false;
	onButtonDisable: boolean;
	submitted:boolean = false;
	filevalue: any;
	myInputVariable: any;

	constructor(public dialog: MatDialog,private profileService: ProfileDataService, private router: Router, private toastr: ToastrService, private datePipe: DatePipe, private scroll: ViewportScroller) {
	}
	// @ViewChild(DialogModelComponent) dialogBox: DialogModelComponent;
	get f() { return this.organizationData.controls };

	Data(value) {
		this.iconSelected = value
		// console.log(this.iconSelected)
	}

	scrollToTop() {

		let element = document.getElementsByClassName('ps__rail-y')[1] as HTMLElement;

		let elementsClass = document.getElementsByClassName('ps__rail-y');
		let elementsClassdiv = Array.from(elementsClass);

		element.addEventListener('click', this.scrolls, true);

		elementsClassdiv.forEach(element => {
			element['style'].top = '0';

			window.scrollTo(0, 0);
		});
		// console.log('true');

	}

	scrolls(e: Event) {
		console.log("scroll", e)
		e.stopPropagation();
	}

	onSubmit() {
		alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.model, null, 4));
	}

	public ngOnInit() {
		this.getuserProfile();
		this.profileData; // initiatlizing the form


		jQuery(document).ready(function () {

			// click on next button
			// jQuery('.form-wizard-steps li').click(function () {  
			// 	$('.form-wizard-steps li').removeClass('active');
			// 	$(this).addClass('active');
			// });

			jQuery('.form-wizard-steps li').on('click', function () {
				jQuery('.form-wizard-steps li').removeClass('active');
				jQuery(this).addClass('active');

				//first hide all other div
				jQuery(".wizard-fieldset").hide();
				var idBtn = jQuery(this).data('id');
				//now open the selected div
				jQuery("#" + idBtn).css('display', 'block');
			});

			jQuery('.form-wizard-next-btn, .form-wizard-previous-btn').on('click', function () {
				// jQuery('.form-wizard-steps li').removeClass('active');
				// jQuery(this).addClass('active');

				//first hide all other div
				jQuery(".wizard-fieldset").hide();
				var idBtn = jQuery(this).data('id');
				//now open the selected div
				jQuery("#" + idBtn).css('display', 'block');

				jQuery('.form-wizard-steps li').removeClass('active');
				jQuery(`.form-wizard-steps li[data-id="${idBtn}"]`).addClass('active');

			})




			//click on form submit button
			jQuery(document).on("click", ".form-wizard .form-wizard-submit", function () {
				var parentFieldset = jQuery(this).parents('.wizard-fieldset');
				var currentActiveStep = jQuery(this).parents('.form-wizard').find('.form-wizard-steps .active');
				parentFieldset.find('.wizard-required').each(function () {
					var thisValue = jQuery(this).val();
					if (thisValue == "") {
						jQuery(this).siblings(".wizard-form-error").slideDown();
					}
					else {
						jQuery(this).siblings(".wizard-form-error").slideUp();
					}
				});
			});


			// focus on input field check empty or not
			jQuery(".form-control").on('focus', function () {
				var tmpThis = jQuery(this).val();
				if (tmpThis == '') {
					jQuery(this).parent().addClass("focus-input");
				}
				else if (tmpThis != '') {
					jQuery(this).parent().addClass("focus-input");
				}
			}).on('blur', function () {
				var tmpThis = jQuery(this).val();
				if (tmpThis == '') {
					jQuery(this).parent().removeClass("focus-input");
					jQuery(this).siblings('.wizard-form-error').slideDown("3000");
				}
				else if (tmpThis != '') {
					jQuery(this).parent().addClass("focus-input");
					jQuery(this).siblings('.wizard-form-error').slideUp("3000");
				}
			});


		});


	}

	//submit the complete form  Dummy function
	submit() {
		console.log("submt", this.profileData)
		this.router.navigate(['/dashboard']);
	}

	// getting the data of signed in person to the form  
	getuserProfile() {
		var filevalue="";
		try {
			this.profileService.getProfile().subscribe(response => {
				this.profilemodel = response[0];
				console.log("profilemodel", this.profilemodel)
				console.log("profileDetails", response[0])
				if (response) {
					console.log("success")
					this.Vendor_ID1 = response[0].generalData[0].Vendor_ID
					console.log("success", this.Vendor_ID1)
					this.profileData.controls['purchGroup'].setValue(response[0].generalData[0].PURCH_GROUP),
						this.profileData.controls['plantCode'].setValue(response[0].generalData[0].COMPANY_CODE),
						this.profileData.controls['title'].setValue(response[0].generalData[0].TITLE),
						this.profileData.controls['vendorName1'].setValue(response[0].generalData[0].VENDOR_NAME_LINE1),
						this.profileData.controls['vendorName2'].setValue(response[0].generalData[0].VENDOR_NAME_LINE2),
						this.profileData.controls['streetLine1'].setValue(response[0].generalData[0].STREET_LINE1),
						this.profileData.controls['streetLine2'].setValue(response[0].generalData[0].STREET_LINE2),
						this.profileData.controls['streetLine3'].setValue(response[0].generalData[0].STREET_LINE3),
						this.profileData.controls['streetLine4'].setValue(response[0].generalData[0].STREET_LINE4),
						this.profileData.controls['postalCode'].setValue(response[0].generalData[0].POSTAL_CODE),
						this.profileData.controls['countryKey'].setValue(response[0].generalData[0].COUNTRY_KEY),
						this.profileData.controls['region'].setValue(response[0].generalData[0].REGION),
						this.profileData.controls['city'].setValue(response[0].generalData[0].CITY),
						this.profileData.controls['telephoneNo'].setValue(response[0].generalData[0].TELEPHONE),
						this.profileData.controls['mobileNo'].setValue(response[0].generalData[0].MOBILE_NO),
						this.profileData.controls['faxNo'].setValue(response[0].generalData[0].FAX),
						this.profileData.controls['vendorEmail'].setValue(response[0].generalData[0].VENDOR_EMAIL_ID),
						this.bankingData.controls['bankName'].setValue(response[0].bankingData[0].BANK_NAME),
						this.bankingData.controls['branch'].setValue(response[0].bankingData[0].BRANCH),
						this.bankingData.controls['bankAccountNo'].setValue(response[0].bankingData[0].BANK_ACCOUNT),
						this.bankingData.controls['swiftCode'].setValue(response[0].bankingData[0].SWIFT_CODE),
						this.bankingData.controls['ifscNo'].setValue(response[0].bankingData[0].IFSC_NUMBER),
						this.bankingData.controls['pfRegisterationNo'].setValue(response[0].bankingData[0].PF_REGISTRATION_NUMBER),
						this.bankingData.controls['ESICRegisterationNo'].setValue(response[0].bankingData[0].ESIC_REGISTRATION_NUMBER),
						this.bankingData.controls['VATRegisterationNo'].setValue(response[0].bankingData[0].VAT_REGISTRATION),
						this.bankingData.controls['panNo'].setValue(response[0].bankingData[0].PAN),
						this.bankingData.controls['serviceTaxRegisterationNo'].setValue(response[0].bankingData[0].SERVICE_TAX_REG_NO),
						this.bankingData.controls['CSTNo'].setValue(response[0].bankingData[0].CST_NO),
						this.bankingData.controls['LSTNo'].setValue(response[0].bankingData[0].LST_NO),
						this.bankingData.controls['GSTRegisterationNo'].setValue(response[0].bankingData[0].GST_REGN),
						this.bankingData.controls['taxClassification'].setValue(response[0].bankingData[0].TAX_CLASSSIFICATION),
						this.bankingData.controls['TDSExcemptionNo'].setValue(response[0].bankingData[0].TDS_EXEMP_NO),
						this.bankingData.controls['excemptionPercentage'].setValue(response[0].bankingData[0].EXEMPT),
						// this.bankingData.controls['TDSExcemptionNo2'].setValue(response.TDSExcemptionNo2),
						// this.bankingData.controls['excemptionPercentage2'].setValue(response.excemptionPercentage2),
						this.bankingData.controls['excemptFrom'].setValue(response[0].bankingData[0].EXEMPT_FROM),
						this.bankingData.controls['excemptTo'].setValue(response[0].bankingData[0].EXEMPT_TO),
						this.bankingData.controls['MSMEStatus'].setValue(response[0].bankingData[0].MSME_STATUS),
						this.bankingData.controls['MSMENo'].setValue(response[0].bankingData[0].MSME_NO),
						this.businessData.controls['businessType'].setValue(response[0].businessData[0].TYPE_OF_BUSINESS),
						this.businessData.controls['industryType'].setValue(response[0].businessData[0].TYPE_OF_INDUSTRY),
						this.businessData.controls['promoters'].setValue(response[0].businessData[0].PROMOTERS),
						console.log("top 5",response[0].businessData[0].UPLOAD_PRODUCT_PORTFOLIO);
						if(response[0].businessData[0].UPLOAD_PRODUCT_PORTFOLIO != "null")
						{
							this.viewAttachmentName=response[0].businessData[0].UPLOAD_PRODUCT_PORTFOLIO;

						}
						console.log(this.viewAttachmentName,'viewAttachmentName')
						// this.organizationData.controls['UploadPortfolio'].setValue(this.viewAttachmentName),
						// console.log(this.organizationData.controls.UploadPortfolio.value,'value here---------')
						this.organizationData.controls['top5Clients'].setValue(response[0].businessData[0].TOP_5_CLIENTS),
						this.businessData.controls['turnOver'].setValue(response[0].businessData[0].TURNOVER),
						console.log(this.businessData.controls.turnOver.value,'value here---------')
						this.businessData.controls['clientRef'].setValue(response[0].businessData[0].CLIENT_REFERNCES),
						this.businessData.controls['complianceCategory'].setValue(response[0].businessData[0].COMPLIANCE_CATEGORY),
						this.businessData.controls['constitutionBus'].setValue(response[0].businessData[0].CONSITUTION_OF_BUS),
						
						this.organizationData.controls['companyName'].setValue(response[0].personalData[0].COMPANY_NAME),
						this.organizationData.controls['parentCompany'].setValue(response[0].personalData[0].PARENT_COMPANY),
						this.organizationData.controls['globalHeadOffice'].setValue(response[0].personalData[0].GLOBAL_HEAD_OFFICE),
						this.organizationData.controls['IndiaHeadOffice'].setValue(response[0].personalData[0].INDIA_HEAD_OFFICE),
						this.organizationData.controls['website'].setValue(response[0].personalData[0].WEBSITE),
						this.organizationData.controls['manufacturingSite'].setValue(response[0].personalData[0].MANUFACTUREING_SITE),
						this.organizationData.controls['mfgCapacity'].setValue(response[0].personalData[0].MFG_CAPACITY),
						this.organizationData.controls['yearofEshtablihsment'].setValue((response[0].personalData[0].YEAR_OF_ESTABLISHMENT).toString()),
						this.organizationData.controls['companyDescription'].setValue(response[0].personalData[0].BRIEF_DESC_OF_COMPANY),
						this.organizationData.controls['BnC_Category'].setValue(response[0].personalData[0].BNC_CATEGORY),
						this.organizationData.controls['Material_Service_Provider'].setValue(response[0].personalData[0].MATERIAL_SERV_PROVIDER),
						this.organizationData.controls['revenueLY'].setValue(response[0].personalData[0].REVENUE),
						this.organizationData.controls['PATLY'].setValue(response[0].personalData[0].PAY_LY),
						this.organizationData.controls['LYSpend'].setValue(response[0].personalData[0].LY_SPEND),
						this.organizationData.controls['EmployeeSize'].setValue(response[0].personalData[0].NO_OF_EMPLOYEES),
						this.organizationData.controls['NameL1'].setValue(response[0].leadershipData[0].L1_LEADER_NAME),
						this.organizationData.controls['emailIDL1'].setValue(response[0].leadershipData[0].L1_LEADER_EMAIL_ID),
						this.organizationData.controls['contactNoL1'].setValue(response[0].leadershipData[0].L1_LEADER_CONTACT_NO),
						this.organizationData.controls['nameL2'].setValue(response[0].leadershipData2[0].L2_LEADER_NAME),
						this.organizationData.controls['emailIDL2'].setValue(response[0].leadershipData2[0].L2_LEADER_EMAIL_ID),
						this.organizationData.controls['contactNoL2'].setValue(response[0].leadershipData2[0].L2_LEADER_CONTACT_NO),
						this.organizationData.controls['BCCLAssociation'].setValue(response[0].leadershipData2[0].L2_LEADER_ASSOCIATED),
						this.organizationData.controls['BCCLannualSpend'].setValue(response[0].leadershipData2[0].L2_LEADER_BCCL_ANNUAL),
						this.organizationData.controls['groupCO'].setValue(response[0].leadershipData2[0].L2_LEADER_GROUP_CO),
						this.organizationData.controls.marketUpdate.setValue(response[0].leadershipData2[0].L2_LEADER_MARKET)

					console.log("updated form", this.organizationData)
				}


			})
		} catch (Error) {
			console.error("error in getDetails", Error);
		}

	}



	//Save the data
	onSave() {
		try {
			this.submitted=true;
			// if (this.organizationData.status == 'VALID'){
				this.onButtonDisable= false
			// console.log("this is fk", this.organizationData)
			this.profileDetails.push(sessionStorage.getItem("Bid"));

			this.profileDetails.push(this.organizationData.controls['companyName'].value);

			this.profileDetails.push(this.organizationData.controls['parentCompany'].value);

			this.profileDetails.push(this.organizationData.controls['globalHeadOffice'].value);

			this.profileDetails.push(this.organizationData.controls['IndiaHeadOffice'].value);

			this.profileDetails.push(this.organizationData.controls['website'].value);

			this.profileDetails.push(this.organizationData.controls['manufacturingSite'].value);

			this.profileDetails.push(this.organizationData.controls['mfgCapacity'].value);

			this.profileDetails.push(this.organizationData.controls['yearofEshtablihsment'].value);

			this.profileDetails.push(this.organizationData.controls['companyDescription'].value);

			this.profileDetails.push(this.organizationData.controls['BnC_Category'].value);

			this.profileDetails.push(this.organizationData.controls['Material_Service_Provider'].value);

			this.profileDetails.push(this.organizationData.controls['revenueLY'].value);

			this.profileDetails.push(this.organizationData.controls['PATLY'].value);

			this.profileDetails.push(this.organizationData.controls['LYSpend'].value);

			this.profileDetails.push(this.organizationData.controls['EmployeeSize'].value);

			this.profileDetails.push(this.organizationData.controls['NameL1'].value);

			this.profileDetails.push(this.organizationData.controls['emailIDL1'].value);

			this.profileDetails.push(Number(this.organizationData.controls['contactNoL1'].value));

			this.profileDetails.push(this.organizationData.controls['nameL2'].value);

			this.profileDetails.push(this.organizationData.controls['emailIDL2'].value);

			this.profileDetails.push(Number(this.organizationData.controls['contactNoL2'].value));

			this.profileDetails.push(Number(this.organizationData.controls['BCCLAssociation'].value));

			this.profileDetails.push(this.organizationData.controls['BCCLannualSpend'].value);

			this.profileDetails.push(Number(this.organizationData.controls['groupCO'].value));

			this.profileDetails.push(this.organizationData.controls['marketUpdate'].value);

			if (this.viewAttachmentName != "" && this.viewAttachmentName != null && this.viewAttachmentName != undefined) {


				this.profileDetails.push(this.viewAttachmentName);


				var fileName = this.getFileNameWOExtention(this.viewAttachmentName + "_");

				fileName = this.getTimeStampFileName(fileName, this.getExtensionOfFile(this.viewAttachmentName));
				// var fileName2 = fileName;
				// fileName = "societyaccount_" + fileName;
				// console.log("FileName here" + fileName);
				this.profileService.uploadFile(this.viewUploadFile, fileName).subscribe(res => {
					// console.log(JSON.stringify(res))
				})
			}
			else {
				this.profileDetails.push('null');
			}
			this.profileDetails.push(this.organizationData.controls['top5Clients'].value);

			this.profileService.save(this.profileDetails).subscribe(res => {
				// console.log(res[0].message)
				if (res[0].message == "success") {
					// if (this.profileModel != undefined && this.profileModel != null) {
					// this.toastr.success("Success!!")
					// this.dialogBox.popUpOpen2('Successfully Done','success','profiledata');
					const dialogConfig = new MatDialogConfig();
					dialogConfig.data = {
						message: 'Successfully Done',
						condition: 'success',
						page: 'profiledata'
					};
					const mydata = dialogConfig.data;
					console.log("PopupComponent", mydata);

					const dialogRef = this.dialog.open(PopupComponent, {
						panelClass: 'custom-modalbox',

						width: '400px',
						data: { datakey: dialogConfig.data }

					});
					dialogRef.afterClosed().subscribe(result => {
					console.log(`Dialog result1: ${result}`);
					});
					this.router.navigate(['/dashboard'])
				}
				else {
					//this.dialogBox.popUpOpen2('Failed to save!!','error','profiledata');
					const dialogConfig = new MatDialogConfig();
					dialogConfig.data = {
						message: 'Failed to save!!',
						condition: 'error',
						page: 'profiledata'
					};
					const mydata = dialogConfig.data;
					console.log("PopupComponent", mydata);

					const dialogRef = this.dialog.open(PopupComponent, {
						panelClass: 'custom-modalbox',

						width: '400px',
						data: { datakey: dialogConfig.data }
					});
					dialogRef.afterClosed().subscribe(result => {
						console.log(`Dialog result1: ${result}`);
					  });
					// this.toastr.error("Failed to save!!")
				}
			});
		//}
		// else{
		// 	// console.log("Status",this.organizationData.status)
		// 	this.toastr.error("Form Data is not valid")
		// }
	}

		catch (Error) {
			console.error("error in getDetails", Error);
		}
	}

	validateFileExtension(fileName) {
		if(fileName){
		let fileExtension: string = this.getExtensionOfFile(fileName);
		for (let i = 0; i < this.AttachmentValidExtension.length; i++) {
			if (this.AttachmentValidExtension[i] == fileExtension.toUpperCase())
				return true;
		}
		return false;
	}
}

	getExtensionOfFile(name) {
		return name.split(".")[name.split(".").length - 1];
	}

	getTimeStampFileName(fileName, extension) {
		console.log(Date.now().toString());
		return fileName + Date.now().toString() + "." + extension;
	}

	getFileNameWOExtention(name) {
		// return name.split(".") [0];
		var flName = name.substr(0, name.lastIndexOf(".")).replace(/_/g, "-").replace(/\. /g, "-");
		return flName;
	}

	// for file upload
	onFileSelectEvent(e) {
	
		this.viewUploadFile = null;
		this.viewAttachmentName = "";
		console.log(e.target.files[0]);
		if (this.validateFileExtension(e.target.files[0].name)) {
			this.fileAttachmentError = "";
			this.viewUploadFile = e.target.files[0];

			console.log("uploaded file", this.viewUploadFile)

			this.confile = e.target.files[0];
			this.viewAttachmentName = this.viewUploadFile.name;
			console.log(this.viewAttachmentName);
		}
		else {
			this.fileAttachmentError = "this. InvalidAttachmentFileError";
		}

		$(".fileSelectBtn").blur();
	}

	numberOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return false;
        }
        return true;
      }
      textOnlywithcomma(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode > 64 || charCode > 91) || charCode == 44 || charCode == 32) {
          return true;
        }
        return false;
      }
      textOnly(event): boolean {
        const charCode = (event.which) ? event.which : event.keyCode;
        if ((charCode > 64 || charCode > 91) ||charCode == 32) {
          return true;
        }
        return false;
      }

	  close(){
		this.viewAttachmentName='';
		this.organizationData.controls['UploadPortfolio'].reset();
	  }

}
