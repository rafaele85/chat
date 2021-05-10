runpostgres := ./run-postgres.bat

buildpostgres:
    $(runpostgres) drop.sql
    $(runpostgres) create-function-jsetstr.sql
    $(runpostgres) create-function-jsetint.sql
    $(runpostgres) create-function-jsetjson.sql
	$(runpostgres) create-table-user.sql
	$(runpostgres) create-table-session.sql
	$(runpostgres) create-table-friend.sql
	$(runpostgres) create-function-userlogin.sql
	$(runpostgres) create-function-usersignup.sql
	$(runpostgres) create-function-userlogout.sql
	$(runpostgres) create-function-friendadd.sql
	$(runpostgres) create-function-friendlist.sql

all: buildpostgres

