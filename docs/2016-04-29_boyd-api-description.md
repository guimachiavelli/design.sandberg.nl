Hello Boyd,

Thanks for the reply!

The data we are looking for is pretty much only student related. Being
more specific:

* list of students, possibly filtered per year and department, with name
 and graduation year;

* for each student, profile info (full name, bio, avatar pic, website, 
 nationality, date of birth) and the list of public projects;

* for each project, content (images, videos, text) and general data (title,
 sub-title, year, tags).

* I would also expect IDs and last edit timestamps to be present on the user 
 and project data.


To give you a better picture of the whole thing, the workflow 
I am thinking about is:

1. request a list of students (something like 
  api.sandberg.nl/users?department=design&year=2016);

2. on our side we would pick students to be added to the archive;

3. once a student is selected to appear in the department site, we use the 
  previously stored student ID to hit the API again, getting the profile info 
  and an array containing the project IDs associated with each student
  (api.sandberg.nl/user?id=9698);

4. query the API to get all the data available for each project.
  (api.sandberg.nl/page?id=18373)

5. still thinking on the best way to do this, but we would also have to
  handle updates on the sandberg.nl site on our side. Though potentially very 
  inefficient I’ll probably have something like a cron task checking 
  for updates every now and then

Does that answer your questions? Or is there anything I missed?

Also, feel free to speak your mind on anything that might strike you as odd or
that would make your lives easier.

Thanks again!
