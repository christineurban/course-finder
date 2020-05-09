

# Course Finder

![](https://raw.githubusercontent.com/christineurban/course-finder/master/src/screenshot.png)

## Part 1
Build a component that allows a user to input a course string, and display the course details. You should provide validation of the course string, and display an error if what they entered is invalid. This should be client side only. Match the design above using modern css practices.

Course String Details:

 - A valid course string is a single string that is a combination of a Department+Course Number, followed by Semester+Year.

- Department is always one or more alphabetic characters.

- Course Number is always one or more numeric characters.

- Department and course number can be separated by an optional delimiter.
Delimiters are “-”, “ ”, or “:”.

- Semester is either an abbreviation or the complete semester.

- Year is either two digits or four digits (you can assume the year 2000 or greater).

- Semester+Year combination can be swapped in position (that is, Year can come before Semester).

- There is always a space between the Department+Course Number and the Semester+Year.

- Semesters could be abbreviated as: F (Fall), W (Winter), S (Spring), Su (Summer)

For example:

`CS111 2018 Fall`

`CS-111 Fall 2016`

`Math 123 2015 Spring`

Examples of Department+Course Number combinations:

`CS111`

`CS 111`

`CS:111`

`CS-111`

Examples of Semester+Year combinations:

`Fall 2018`

`fall 18`

`2016 Fall`

`F2016`

`Fall2016`

All input should be normalized, that is, 2 digits years should become 4 digits, and semester abbreviations should become full semesters, so that any combination of the above examples will result in the exact same course:

`Department: CS`

`Course Number: 111`

`Year: 2016`

`Semester: Fall`

## Part 2
Enforce the following rule: Once a student has added a course, they can not add the course again, even if it is a different year and/or semester.

Test Data:

`CS111 2016 Fall`

`CS111 2016 Spring`

`EC200 F2017`

(should fail on 2nd item)

`CS111 2016 Fall`

`EC200 F2017`

`CS111 F2017`

(should fail on 3rd item)

`EC200 F2017`

`CS111 2016 Fall`

`EC201 F2018`

`CS111 F2017`

(should fail on 4th item)

`CS111 2016 Fall`

`CS121 2016 Fall`

(should still succeed) 

## Part 3
Print out all courses taken by a user, in order of:

Year (2020->2000)

Semester (Fall->Winter->Spring->Summer)

Department (A-Z)

Course Number(0->999999)


Input:

`CS111 2016 Fall`

`EC112 S2016`

`CS112 2016 Spring`

`CS108 W2016`

`CS121 2020 Fall`

`MT119 2020 Fall`

`CS118 2020 Summer`

Output:

`CS121 2020 Fall`

`MT119 2020 Fall`

`CS118 2020 Summer`

`CS111 2016 Fall`

`CS108 2016 Winter`

`CS112 2016 Spring`

`EC112 2016 Spring `
