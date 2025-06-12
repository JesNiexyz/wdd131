// courses.js

// aCourse object holds course info, sections, and methods to enroll/drop students
const aCourse = {
  code: "CSE121b", // Course code
  name: "Javascript Language", // Course name
  sections: [
    {
      sectionNum: 1,
      roomNum: "STC 353",
      enrolled: 26,
      days: "TTh",
      instructor: "Bro T",
    },
    {
      sectionNum: 2,
      roomNum: "STC 347",
      enrolled: 25,
      days: "TTh",
      instructor: "Sis A",
    },
  ],
  enrollStudent: function (sectionNum) {
    // find the right section...Array.findIndex will work here
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum == sectionNum
    );
    // If the section is found, increment the enrolled count and update the table
    if (sectionIndex >= 0) {
      this.sections[sectionIndex].enrolled++;
      renderSections(this.sections);
    }
  },
  dropStudent: function (sectionNum) {
    // find the right section...Array.findIndex will work here
    const sectionIndex = this.sections.findIndex(
      (section) => section.sectionNum == sectionNum
    );
    // If the section is found, decrement the enrolled count and update the table
    if (sectionIndex >= 0) {
      this.sections[sectionIndex].enrolled--;
      renderSections(this.sections);
    }
  },
};

// setCourseInfo updates the course name and code in the HTML
function setCourseInfo(course) {
  const courseName = document.querySelector("#courseName");
  const coursecode = document.querySelector("#courseCode");
  courseName.textContent = course.name;
  coursecode.textContent = course.code;
}

// renderSections displays the sections in the table body
function renderSections(sections) {
  // Map each section to a table row string
  const html = sections.map(
    (section) => `<tr>
    <td>${section.sectionNum}</td>
    <td>${section.roomNum}</td>
    <td>${section.enrolled}</td>
    <td>${section.days}</td>
    <td>${section.instructor}</td></tr>`
  );
  // Set the innerHTML of the table body to the generated rows
  document.querySelector("#sections").innerHTML = html.join("");
}

// Event listener for the "Enroll Student" button
document.querySelector("#enrollStudent").addEventListener("click", function () {
  // Get the section number from the input
  const sectionNum = document.querySelector("#sectionNumber").value;
  // Call enrollStudent method on aCourse
  aCourse.enrollStudent(sectionNum);
});

// Event listener for the "Drop Student" button
document.querySelector("#dropStudent").addEventListener("click", function () {
  // Get the section number from the input
  const sectionNum = document.querySelector("#sectionNumber").value;
  // Call dropStudent method on aCourse
  aCourse.dropStudent(sectionNum);
});

// Initialize the page with course info and section list
setCourseInfo(aCourse);
renderSections(aCourse.sections);