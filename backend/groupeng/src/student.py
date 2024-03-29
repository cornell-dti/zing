# Copyright 2011, Thomas G. Dimiduk
#
# This file is part of GroupEng.
#
# GroupEng is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# GroupEng is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with GroupEng.  If not, see <http://www.gnu.org/licenses/>.
"""
Student record.  Creating Student record from a csv (excel) file.

.. moduleauthor:: Thomas G. Dimiduk tgd8@cornell.edu
"""
from .utility import numberize
from google.cloud import firestore

group_number = 'Group Number'


class Student(object):
    """
    """
    def __init__(self, data={}, headers=[], identifier=None):
        """

        Arguments:
        :param attributes:
        :type attributes:

        """
        self.identifier = identifier
        if identifier == None:
            # if they don't give us an identifier, just use the first column
            self.identifier = headers[0]

        self.data = data
        for key, val in self.data.items():
            if val in ['', '0']:
                self.data[key] = None
            else:
                self.data[key] = numberize(val)

        self.group = None
        self.headers = list(headers)
        if group_number not in self.headers:
            self.headers.append(group_number)

    @property
    def group_number(self):
        return self.group.group_number

    def __getitem__(self, x):
        if x == group_number:
            return self.group.group_number
        else:
            return self.data[x]

    def __str__(self):
        return "<Student : {0}>".format(self.data)

    def __repr__(self):
        return "Student(data={0}, headers={1}, identifier={2})".format(
            self.data, self.headers, self.identifier)

    def full_record(self):
        return [str(self[h]) for h in self.headers]


def attribute_match(attribute, value):
    if isinstance(value, (list, tuple)):
        return lambda x: x[attribute] in value
    else:
        return lambda x: x[attribute] == value


def attribute_differs(attribute, value):
    return lambda x: x[attribute] != value


def load_classlist_from_firestore(classId, identifier):
    """Loads all ungrouped student information from Firestore."""
    survey_collection_ref = firestore.Client().collection("course").document(
        classId).collection("survey")
    survey_docs = survey_collection_ref.stream()
    # students = list(
    #    map(lambda x: construct_student_data(x, identifier), survey_docs))
    students = []
    for doc in survey_docs:
        students.append(construct_student_data(doc, identifier))
    return students


def construct_student_data(docSnapshot, identifier):
    """Creates student object from given dict of student info."""
    student_dict = docSnapshot.to_dict()
    # document has three base-level fields: fullName, email(identifier) and surveyResponse
    data = {
        'fullName': student_dict['fullName'],
        identifier: student_dict[identifier],
        **student_dict['surveyResponse']
    }
    headers = list(data.keys())
    student = Student(data, headers, identifier)
    return student