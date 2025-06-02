// Regex for validation
const strRegex = /^[a-zA-Z\s]*$/; // Only letters and spaces
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; // Phone number validation

// Form elements
const mainForm = document.getElementById('cv-form');

// User input elements
const firstnameElem = mainForm?.firstname,
    middlenameElem = mainForm?.middlename,
    lastnameElem = mainForm?.lastname,
    imageElem = mainForm?.image,
    designationElem = mainForm?.designation,
    addressElem = mainForm?.address,
    emailElem = mainForm?.email,
    phonenoElem = mainForm?.phoneno,
    summaryElem = mainForm?.summary;

// Display elements
const nameDsp = document.getElementById('fullname_dsp'),
    imageDsp = document.getElementById('image_dsp'),
    phonenoDsp = document.getElementById('phoneno_dsp'),
    emailDsp = document.getElementById('email_dsp'),
    addressDsp = document.getElementById('address_dsp'),
    designationDsp = document.getElementById('designation_dsp'),
    summaryDsp = document.getElementById('summary_dsp'),
    projectsDsp = document.getElementById('projects_dsp'),
    achievementsDsp = document.getElementById('achievements_dsp'),
    skillsDsp = document.getElementById('skills_dsp'),
    educationsDsp = document.getElementById('educations_dsp'),
    experiencesDsp = document.getElementById('experiences_dsp');

// Validation types
const validType = {
    TEXT: 'text',
    TEXT_EMP: 'text_emp',
    EMAIL: 'email',
    PHONENO: 'phoneno',
    ANY: 'any',
};

// Fetch values from repeater fields
const fetchValues = (attrs, ...nodeLists) => {
    const tempDataArr = [];
    const elemsDataCount = nodeLists[0].length;

    for (let i = 0; i < elemsDataCount; i++) {
        const dataObj = {};
        for (let j = 0; j < attrs.length; j++) {
            dataObj[attrs[j]] = nodeLists[j][i].value;
        }
        tempDataArr.push(dataObj);
    }

    return tempDataArr;
};

// Get user inputs
const getUserInputs = () => {
    // Achievements
    const achievementsTitleElem = document.querySelectorAll('.achieve_title'),
        achievementsDescriptionElem = document.querySelectorAll('.achieve_description');

    // Experiences
    const expTitleElem = document.querySelectorAll('.exp_title'),
        expOrganizationElem = document.querySelectorAll('.exp_organization'),
        expLocationElem = document.querySelectorAll('.exp_location'),
        expStartDateElem = document.querySelectorAll('.exp_start_date'),
        expEndDateElem = document.querySelectorAll('.exp_end_date'),
        expDescriptionElem = document.querySelectorAll('.exp_description');

    // Education
    const eduSchoolElem = document.querySelectorAll('.edu_school'),
        eduDegreeElem = document.querySelectorAll('.edu_degree'),
        eduCityElem = document.querySelectorAll('.edu_city'),
        eduStartDateElem = document.querySelectorAll('.edu_start_date'),
        eduGraduationDateElem = document.querySelectorAll('.edu_graduation_date'),
        eduDescriptionElem = document.querySelectorAll('.edu_description');

    // Projects
    const projTitleElem = document.querySelectorAll('.proj_title'),
        projLinkElem = document.querySelectorAll('.proj_link'),
        projDescriptionElem = document.querySelectorAll('.proj_description');

    // Skills
    const skillElem = document.querySelectorAll('.skill');

    // Add event listeners for validation
    firstnameElem?.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'First Name'));
    middlenameElem?.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT_EMP, 'Middle Name'));
    lastnameElem?.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Last Name'));
    phonenoElem?.addEventListener('keyup', (e) => validateFormData(e.target, validType.PHONENO, 'Phone Number'));
    emailElem?.addEventListener('keyup', (e) => validateFormData(e.target, validType.EMAIL, 'Email'));
    addressElem?.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Address'));
    designationElem?.addEventListener('keyup', (e) => validateFormData(e.target, validType.TEXT, 'Designation'));

    achievementsTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    achievementsDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    expTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    expOrganizationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Organization')));
    expLocationElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Location')));
    expStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    expEndDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'End Date')));
    expDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    eduSchoolElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'School')));
    eduDegreeElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Degree')));
    eduCityElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'City')));
    eduStartDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Start Date')));
    eduGraduationDateElem.forEach(item => item.addEventListener('blur', (e) => validateFormData(e.target, validType.ANY, 'Graduation Date')));
    eduDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    projTitleElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Title')));
    projLinkElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Link')));
    projDescriptionElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Description')));
    skillElem.forEach(item => item.addEventListener('keyup', (e) => validateFormData(e.target, validType.ANY, 'Skill')));

    return {
        firstname: firstnameElem?.value,
        middlename: middlenameElem?.value,
        lastname: lastnameElem?.value,
        designation: designationElem?.value,
        address: addressElem?.value,
        email: emailElem?.value,
        phoneno: phonenoElem?.value,
        summary: summaryElem?.value,
        achievements: fetchValues(['achieve_title', 'achieve_description'], achievementsTitleElem, achievementsDescriptionElem),
        experiences: fetchValues(['exp_title', 'exp_organization', 'exp_location', 'exp_start_date', 'exp_end_date', 'exp_description'], expTitleElem, expOrganizationElem, expLocationElem, expStartDateElem, expEndDateElem, expDescriptionElem),
        educations: fetchValues(['edu_school', 'edu_degree', 'edu_city', 'edu_start_date', 'edu_graduation_date', 'edu_description'], eduSchoolElem, eduDegreeElem, eduCityElem, eduStartDateElem, eduGraduationDateElem, eduDescriptionElem),
        projects: fetchValues(['proj_title', 'proj_link', 'proj_description'], projTitleElem, projLinkElem, projDescriptionElem),
        skills: fetchValues(['skill'], skillElem),
    };
};

// Validate form data
function validateFormData(elem, elemType, elemName) {
    if (elemType === validType.TEXT && (!strRegex.test(elem.value) || elem.value.trim().length === 0)) {
        addErrMsg(elem, elemName);
    } else if (elemType === validType.TEXT_EMP && !strRegex.test(elem.value)) {
        addErrMsg(elem, elemName);
    } else if (elemType === validType.EMAIL && (!emailRegex.test(elem.value) || elem.value.trim().length === 0)) {
        addErrMsg(elem, elemName);
    } else if (elemType === validType.PHONENO && (!phoneRegex.test(elem.value) || elem.value.trim().length === 0)) {
        addErrMsg(elem, elemName);
    } else if (elemType === validType.ANY && elem.value.trim().length === 0) {
        addErrMsg(elem, elemName);
    } else {
        removeErrMsg(elem);
    }
}

// Add error message
function addErrMsg(formElem, formElemName) {
    formElem.nextElementSibling.innerHTML = `${formElemName} is invalid`;
}

// Remove error message
function removeErrMsg(formElem) {
    formElem.nextElementSibling.innerHTML = '';
}

// Display CV data
const displayCV = (userData) => {
    nameDsp.textContent = `${userData.firstname} ${userData.middlename} ${userData.lastname}`;
    phonenoDsp.textContent = userData.phoneno;
    emailDsp.textContent = userData.email;
    addressDsp.textContent = userData.address;
    designationDsp.textContent = userData.designation;
    summaryDsp.textContent = userData.summary;

    // Display achievements, experiences, education, projects, and skills
    achievementsDsp.innerHTML = userData.achievements.map(item => `<div class="preview-item"><h4>${item.achieve_title}</h4><p>${item.achieve_description}</p></div>`).join('');
    experiencesDsp.innerHTML = userData.experiences.map(item => `<div class="preview-item"><h4>${item.exp_title} at ${item.exp_organization}</h4><p>${item.exp_location} | ${item.exp_start_date} - ${item.exp_end_date}</p><p>${item.exp_description}</p></div>`).join('');
    educationsDsp.innerHTML = userData.educations.map(item => `<div class="preview-item"><h4>${item.edu_degree} at ${item.edu_school}</h4><p>${item.edu_city} | ${item.edu_start_date} - ${item.edu_graduation_date}</p><p>${item.edu_description}</p></div>`).join('');
    projectsDsp.innerHTML = userData.projects.map(item => `<div class="preview-item"><h4>${item.proj_title}</h4><p><a href="${item.proj_link}" target="_blank">${item.proj_link}</a></p><p>${item.proj_description}</p></div>`).join('');
    skillsDsp.innerHTML = userData.skills.map(item => `<div class="preview-item"><p>${item.skill}</p></div>`).join('');
};

// Generate CV
const generateCV = () => {
    const userData = getUserInputs();
    displayCV(userData);
};

// Print CV
function printCV() {
    generateCV(); // Ensure the preview is updated
    window.print();
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    generateCV();
});
// Improved print functionality
function prepareForPrint() {
    // Hide unnecessary elements
    document.querySelectorAll('nav, .print-btn-sc, .cv-form-blk').forEach(el => {
        el.style.display = 'none';
    });
    
    // Ensure proper dimensions
    const previewCnt = document.querySelector('.preview-cnt');
    previewCnt.style.width = '210mm';
    previewCnt.style.minHeight = '297mm';
    previewCnt.style.margin = '0 auto';
}

function restoreAfterPrint() {
    // Show elements again
    document.querySelectorAll('nav, .print-btn-sc, .cv-form-blk').forEach(el => {
        el.style.display = '';
    });
    
    // Reset dimensions
    const previewCnt = document.querySelector('.preview-cnt');
    previewCnt.style.width = '';
    previewCnt.style.minHeight = '';
    previewCnt.style.margin = '';
}

function printCV() {
    prepareForPrint();
    window.print();
    setTimeout(restoreAfterPrint, 1000);
}

// Initialize repeater for all sections
$(document).ready(function() {
    $('.repeater').repeater({
        show: function() {
            $(this).slideDown();
            generateCV();
        },
        hide: function(deleteElement) {
            $(this).slideUp(deleteElement);
            generateCV();
        }
    });
});
