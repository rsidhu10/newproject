SELECT district_name,division_name, count(habitation) FROM `phyprogress` as p
left join villages as v on
v.village_misid = p.miscode
left join divisions as di on
v.division_id = di.division_id
left join districts as d on
v.district_id = d.id
group by di.division_id
order by d.district_name,di.division_name


update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV01") where division_id ="DIV01";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV02") where division_id ="DIV02";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV03") where division_id ="DIV03";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV05") where division_id ="DIV05";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV06") where division_id ="DIV06";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV07") where division_id ="DIV07";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV09") where division_id ="DIV09";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV11") where division_id ="DIV11";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV13") where division_id ="DIV13";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV14") where division_id ="DIV14";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV16") where division_id ="DIV16";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV17") where division_id ="DIV17";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV18") where division_id ="DIV18";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV19") where division_id ="DIV19";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV21") where division_id ="DIV21";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV23") where division_id ="DIV23";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV24") where division_id ="DIV24";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV28") where division_id ="DIV28";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV34") where division_id ="DIV34";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV36") where division_id ="DIV36";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV37") where division_id ="DIV37";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV38") where division_id ="DIV38";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV39") where division_id ="DIV39";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV41") where division_id ="DIV41";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV43") where division_id ="DIV43";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV44") where division_id ="DIV44";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV45") where division_id ="DIV45";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV46") where division_id ="DIV46";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV48") where division_id ="DIV48";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV50") where division_id ="DIV50";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV52") where division_id ="DIV52";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV54") where division_id ="DIV54";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV55") where division_id ="DIV55";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV56") where division_id ="DIV56";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV58") where division_id ="DIV58";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV59") where division_id ="DIV59";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV61") where division_id ="DIV61";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV62") where division_id ="DIV62";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV64") where division_id ="DIV64";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV66") where division_id ="DIV66";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV67") where division_id ="DIV67";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV68") where division_id ="DIV68";
update division_stats set targets =(select count(village) from underprogress as u left join villages as v on v.village_misid = u.code where v.division_id = "DIV72") where division_id ="DIV72";