select d.district_name,count(u.village) as Number from underprogress as u left join villages as v on 
v.village_misid = u.code left join districts as d on v.district_id = d.id group by d.id order by d.district_name;

SELECT d.district_name,count(p.habitation) FROM `phyprogress` as p left join villages as v on
v.village_misid = p.miscode left join districts as d on v.district_id = d.id group by d.id order by d.district_name;

