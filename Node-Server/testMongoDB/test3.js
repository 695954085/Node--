var student = {
    grades:[70,71,72]
}
var db = connect('liuyanben');
db.students.insert(student);
print('[demo]log  print success');