import React, { Component } from "react";
import { isAlpha, isNumeric, splitAlphaNumeric } from "./utility";
import "./styles.scss";

const SEMESTER_MAP = {
  f: "Fall",
  w: "Winter",
  s: "Spring",
  su: "Summer",
  fall: "Fall",
  winter: "Winter",
  spring: "Spring",
  summer: "Summer"
};

const ERROR_TEXT_MAP = {
  parsingError: "Error: Could not parse course",
  duplicateError: "Sorry, you've already added this course"
};

class CourseFinder extends Component {
  state = {
    entry: "",
    dept: "",
    course: "",
    year: "",
    semester: "",
    showCard: false,
    error: "",
    existingCourses: []
  };

  parseCourseString = () => {
    const { entry } = this.state;
    const tempExistingCourses = [...this.state.existingCourses];

    let dept, course, semester, year, deptAndCourse, semesterAndYear;

    const splitDeptAndCourse = () => {
      // allowed delimiters: ':' or '-'
      if (deptAndCourse.split(":").length === 2) {
        [dept, course] = deptAndCourse.split(":");
      } else if (deptAndCourse.split("-").length === 2) {
        [dept, course] = deptAndCourse.split("-");
        // no delimiter: split in half
      } else if (splitAlphaNumeric(deptAndCourse).length === 2) {
        [dept, course] = splitAlphaNumeric(deptAndCourse);
      } else {
        return this.setError("parsingError");
      }
    };

    const splitSemesterAndYear = () => {
      // split in half
      if (splitAlphaNumeric(semesterAndYear).length === 2) {
        [semester, year] = splitAlphaNumeric(semesterAndYear);
      } else {
        return this.setError("parsingError");
      }
    };

    // fail fast: first char must be a letter
    if (!isAlpha(entry.trim()[0])) {
      return this.setError("parsingError");
    }

    // split the entry on one or many white spaces and trim whitespace off either end
    const splitDetails = entry.trim().split(/ +/);

    if (splitDetails.length === 4) {
      [dept, course, semester, year] = splitDetails;
    } else if (splitDetails.length === 3) {
      // splitDetails[0] is all numbers or letters therefore semesterAndYear needs to be split
      if (splitAlphaNumeric(splitDetails[0]).length === 1) {
        [dept, course, semesterAndYear] = splitDetails;
        splitSemesterAndYear();
        // splitDetails[2] is all numbers or letters therefore deptAndCourse needs to be split
      } else if (splitAlphaNumeric(splitDetails[2]).length === 1) {
        [deptAndCourse, semester, year] = splitDetails;
        splitDeptAndCourse();
      } else {
        return this.setError("parsingError");
      }
    } else if (splitDetails.length === 2) {
      [deptAndCourse, semesterAndYear] = splitDetails;
      splitDeptAndCourse();
      splitSemesterAndYear();
      // splitDetails cannot be a length other than 2, 3, or 4
    } else {
      return this.setError("parsingError");
    }

    // check if semester and year are swapped
    if (isNumeric(semester) && isAlpha(year)) {
      [semester, year] = [year, semester];
    }

    // validate dept: must be all letters
    if (!isAlpha(dept)) {
      return this.setError("parsingError");
    } else {
      dept = dept.toUpperCase();
    }

    // validate course: must be all numbers
    if (!isNumeric(course)) {
      return this.setError("parsingError");
    }

    // parse and validate semester: must be in semester mapping
    if (SEMESTER_MAP[semester.toLowerCase()]) {
      semester = SEMESTER_MAP[semester.toLowerCase()];
    } else {
      return this.setError("parsingError");
    }

    // parse and validate year: must be 2 or 4 digits
    if (year.length === 2) {
      year = `20${year}`;
    } else if (year.length !== 4) {
      return this.setError("parsingError");
    }

    const existingCourse = tempExistingCourses.find(course => {
      return course.dept === dept && course.course === course;
    });

    if (existingCourse) {
      return this.setError("duplicateError");
    }

    tempExistingCourses.push({
      dept,
      course,
      semester,
      year
    });

    const sortedExistingCourses = tempExistingCourses.sort((a, b) => {
      return b.year - a.year;
    });

    this.setState({
      dept,
      course,
      semester,
      year,
      showCard: true,
      existingCourses: sortedExistingCourses
    });
  };

  handleChange = e => {
    this.setState({
      entry: e.target.value,
      showCard: false,
      error: ""
    });
  };

  setError = errorType => {
    this.setState({
      error: ERROR_TEXT_MAP[errorType]
    });
  };

  render() {
    const { entry, showCard, error, existingCourses } = this.state;

    return (
      <div className="course-finder">
        <div className="course-finder__label">Course</div>
        <div className="course-finder--flex">
          <input
            className={`course-finder__input ${error &&
              "course-finder__input-error"}`}
            type="text"
            autocomplete="off"
            value={entry}
            placeholder="Enter course"
            onChange={this.handleChange}
          />
          <button
            className={`course-finder__button ${entry === "" &&
              "course-finder__button-disabled"}`}
            disabled={entry === ""}
            onClick={this.parseCourseString}
          >
            Submit
          </button>
        </div>

        {error && <div className="course-finder__error-text">{error}</div>}

        {showCard &&
          existingCourses.map(course => (
            <div className="course-finder__card">
              <div className="course-finder__card-header">{`${course.dept} ${
                course.course
              }`}</div>
              <div className="course-finder__card-details course-finder--flex">
                <div className="course-finder__card-labels">
                  <div>Department</div>
                  <div>Course</div>
                  <div>Year</div>
                  <div>Semester</div>
                </div>
                <div>
                  <div>{course.dept}</div>
                  <div>{course.course}</div>
                  <div>{course.year}</div>
                  <div>{course.semester}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    );
  }
}

export default CourseFinder;
