41960
Bahawal Bassi
11618
Bhawal Bassi
41964
Bhagu
11612
Bhagu
41966
Bishan Pura
11645
Bishan Pura
41967
Burj Hanumangarh
11676
Burj Hanumangarh
41969
Ch Kala Tibba
11627
Chak Kala Tibba
41974
Dodewala
11611
Dodewala


11613 Himatpura   41979-> Himmat Pura



SELECT v.survey_mapped,v.village_id  FROM villages as v
left JOIN mappedsurvey as m ON
m.misid = v.village_id
WHERE m.id = 2898


SELECT vcode,village FROM survey 
left JOIN mappedsurvey ON
mappedsurvey.surveycode = survey.vcode
WHERE block_id = 'D13B05'
and mappedsurvey.misid is null



