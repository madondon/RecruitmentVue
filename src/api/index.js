import axios from "axios";

function getLocation(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/location",
    });
}

function getUserInfo(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/queryUserInfo",
    });
}

function getUserInfoById(id){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getUserInfoById/"+id,
    });
}


function getUserByNumber(num){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getUserByNumber/"+num,
    });
}

function selectJob(name){
    return axios({
        method: "GET",
        url: "http://localhost:8080/selectJob/"+name,
    });
}

function selectCol(name){
    return axios({
        method: "GET",
        url: "http://localhost:8080/selectCol/"+name,
    });
}

function addUserInfo(id,pwd,phone,sex,name, mail,wordKey,identity,education,birthday){
    return axios({
        method: "POST",
        url: "http://localhost:8080/addUserInfo",
        data : {
            id:id,
            password:pwd,
            birthday:birthday ,
            education:education,
            identity: identity,
            wordKey:wordKey ,
            mail: mail,
            name:name,
            phone: phone,
            sex: sex,
        },
    });
}

function updatePassword(id,password){
    return axios({
        method: "POST",
        url: "http://localhost:8080/updatePassword",
        data : {
            id:id,
            password:password,
           },
    });
}

function updateAdmin(id){
    return axios({
        method: "POST",
        url: "http://localhost:8080/updateAdmin",
        data : {
            id:id,
        },
    });
}

function updatePicture(id,picture){
    return axios({
        method: "POST",
        url: "http://localhost:8080/updatePicture",
        data : {
            id:id,
            picture:picture,
            },
    });
}

function updateUserInfoById(id,phone,sex,name,mail,wordKey,identity,education,birthday){
    return axios({
        method: "POST",
        url: "http://localhost:8080/updateUserInfoById",
        data : {
            birthday: birthday,
            education: education,
            id: id,
            identity: identity,
            wordKey: wordKey,
            mail: mail,
            name: name,
            phone: phone,
            sex: sex
            },
    });
}

function deleteUserInfoById(id){
    return axios({
        method: "DELETE",
        url: "http://localhost:8080/deleteUserInfoById/"+id,
    });
}

function getDelNum(id){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getDelNum/"+id,
    });
}

function getColNum(id){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getColNum/"+id,
    });
}

function initDel(id){
    return axios({
        method: "POST",
        url: "http://localhost:8080/initDel/"+id,
    });
}

function initCol(id){
    return axios({
        method: "POST",
        url: "http://localhost:8080/initCol/"+id,
    });
}

function reset(){
    return axios({
        method: "POST",
        url: "http://localhost:8080/reset",
    });
}

function queryJobInfo(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/queryJobInfo",
    });
}

function deleteJobInfoById(jobid){
    return axios({
        method: "DELETE",
        url: "http://localhost:8080/deleteJobInfoById/"+jobid,
    });
}

function getColByUserId(jobid){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getColByUserId/"+jobid,
    });
}

function deleteColById(jobid,userid){
    return axios({
        method: "DELETE",
        url: "http://localhost:8080/deleteColById/"+jobid+"/"+userid,
    });
}

function getDelByUserId(jobid){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getDelByUserId/"+jobid,
    });
}

function deleteDelById(jobid,userid){
    return axios({
        method: "DELETE",
        url: "http://localhost:8080/deleteDelById/"+jobid+"/"+userid,
    });
}

function updateRecycle(jobid,userid){
    return axios({
        method: "POST",
        url: "http://localhost:8080/updateRecycle",
        data : {
            jobid: jobid,
            userid: userid
        },
    });
}

function updateDelTime(jobid,userid){
    return axios({
        method: "POST",
        url: "http://localhost:8080/updateDelTime",
        data : {
            jobid: jobid,
            userid: userid
        },
    });
}

function addDelInfo(jobid,userid,name,money,workarea,coname){
    return axios({
        method: "POST",
        url: "http://localhost:8080/addDelInfo",
        data : {
            jobid: jobid,
            userid: userid,
            name: name,
            money: money,
            workarea: workarea,
            coname: coname
        },
    });
}

function initColDel(id){
    return axios({
        method: "POST",
        url: "http://localhost:8080/initColDel/"+id,
    });
}

function resetCol(){
    return axios({
        method: "POST",
        url: "http://localhost:8080/resetCol",
    });
}

function selectInfo(money,workarea,cotype,cosize,experience,degreefrom){
    return axios({
        method: "POST",
        url: "http://localhost:8080/selectInfo",
        data : {
            money: money,
            workarea: workarea,
            cotype: cotype,
            cosize: cosize,
            experience:experience,
            degreefrom:degreefrom
        },
    });
}

function addColInfo(jobid,userid,coid,name,money,workarea,coname,cotype,cosize,jobwelf,experience,degreefrom,num,content){
    return axios({
        method: "POST",
        url: "http://localhost:8080/addColInfo",
        data : {
            jobid: jobid,
            userid:userid,
            coid: coid,
            name: name,
            money: money,
            workarea:workarea,
            coname: coname,
            cotype: cotype,
            cosize: cosize,
            jobwelf: jobwelf,
            experience: experience,
            degreefrom: degreefrom,
            num: num,
            content:content
        },
    });
}

function getAna1(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getAna1"
    });
}

function getAna2(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getAna2"
    });
}

function getAna3(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getAna3"
    });
}

function getAna4(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getAna4"
    });
}

function getAna5(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getAna5"
    });
}
function getAna6(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getAna6"
    });
}

function getAna7(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getAna7"
    });
}

function getAna8(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getAna8"
    });
}

function getAna9(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getAna9"
    });
}

function getAna10(){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getAna10"
    });
}

function getMessage(num){
    return axios({
        method: "GET",
        url: "http://localhost:8080/getMessage/"+num
    });
}
export default {
    getUserInfo,getUserInfoById,addUserInfo,updatePassword,deleteUserInfoById,updateUserInfoById,updatePicture,updateAdmin,getLocation,getColNum,getDelNum,reset,queryJobInfo,
    initCol,initDel,deleteJobInfoById,getColByUserId,deleteColById,getDelByUserId,deleteDelById,updateRecycle,updateDelTime,addDelInfo,resetCol,initColDel,addColInfo,selectJob,
    selectCol,selectInfo,getAna1,getAna2,getAna3,getAna4,getAna5,getAna6,getAna7,getAna8,getAna9,getAna10,getMessage,getUserByNumber
    
}