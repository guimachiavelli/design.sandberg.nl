require 'erb'
require 'json'

HEADER = ERB.new(File.read('./templates/header.html.erb'))
FOOTER = ERB.new(File.read('./templates/footer.html.erb'))
STUDENTS  = ERB.new(File.read('./templates/students.html.erb'))
PROJECTS  = ERB.new(File.read('./templates/projects.html.erb'))
GRADUATION = ERB.new(File.read('./templates/graduation.html.erb'))
SINGLE_STUDENT = ERB.new(File.read('./templates/single-student.html.erb'))
SINGLE_PROJECT = ERB.new(File.read('./templates/single-project.html.erb'))
IMAGES = ERB.new(File.read('./templates/images.html.erb'))
LINKS = ERB.new(File.read('./templates/links.html.erb'))
VIDEOS = ERB.new(File.read('./templates/videos.html.erb'))
TEXTS = ERB.new(File.read('./templates/texts.html.erb'))
YEARS = ERB.new(File.read('./templates/years.html.erb'))

def main
    file = ARGV[0]
    content = JSON.parse(File.read(file), symbolize_names: true)

    @title = File.basename(file, '.json')
    @students = content[:students]
    @projects = content[:projects]
    @student = content[:student]
    @graduation = content[:graduation]
    @project = content[:project]
    @links = content[:links]
    @images = content[:images]
    @videos = content[:videos]
    @texts = content[:texts]
    @years = content[:years]
    @footer_links = content[:footer_links]
    @yearbook_link = content[:yearbook]

    page = HEADER.result
    page += GRADUATION.result
    page += STUDENTS.result
    page += SINGLE_STUDENT.result + SINGLE_PROJECT.result
    page += PROJECTS.result
    page += IMAGES.result + LINKS.result
    page += VIDEOS.result
    page += TEXTS.result
    page += YEARS.result
    page += FOOTER.result

    File.write "public/#{@title}.html", page
end

main
