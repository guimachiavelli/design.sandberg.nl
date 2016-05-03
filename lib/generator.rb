require 'erb'
require 'json'

HEADER = ERB.new(File.read('./templates/header.html.erb'))
FOOTER = ERB.new(File.read('./templates/footer.html.erb'))
STUDENTS  = ERB.new(File.read('./templates/students.html.erb'))
PROJECTS  = ERB.new(File.read('./templates/projects.html.erb'))
GRADUATION = ERB.new(File.read('./templates/graduation.html.erb'))
SINGLE_STUDENT  = ERB.new(File.read('./templates/single-student.html.erb'))
SINGLE_PROJECT  = ERB.new(File.read('./templates/single-project.html.erb'))

def main
    file = ARGV[0]
    content = JSON.parse(File.read(file), symbolize_names: true)

    @title = File.basename(file, '.json')
    @students = content[:students]
    @projects = content[:projects]
    @student = content[:student]
    @graduation = content[:graduation]
    @project = content[:project]
    @footer_links = content[:footer_links]
    @yearbook_link = content[:yearbook]

    page = HEADER.result
    page += GRADUATION.result
    page += STUDENTS.result
    page += SINGLE_STUDENT.result + SINGLE_PROJECT.result
    page += PROJECTS.result
    page += FOOTER.result

    File.write "public/#{@title}.html", page
end

main
