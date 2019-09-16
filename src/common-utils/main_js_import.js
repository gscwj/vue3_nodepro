import Vue from 'vue'

/*导入axios*/
import axios from 'axios'
axios.defaults.withCredentials = true;

const DownloadFile = (res)=>{
    let header_disposition = '';
    let filename = "下载文件";
    if(res.headers.hasOwnProperty('content-disposition')){
        header_disposition = res.headers['content-disposition'];
        console.log("文件下载接口的header_disposition =",header_disposition);
        filename = header_disposition.split(';')[1].split('=')[1];
        console.log("filename =",filename);
    }
    const blob = new Blob([res.data]);
    if('download' in document.createElement('a')){/*非IE下载*/
        const elink = document.createElement('a');
        elink.download = filename;
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);/*释放url对象*/
        document.body.removeChild(elink);
    }
    else{/*IE10+下载*/
        navigator.msSaveBlob(blob, filename);
    }

};


export default {
    name: 'mainjs',
    install: function (Vue, options) {
        Object.defineProperty(Vue.prototype, '$DownloadFile', {value: DownloadFile});
        Object.defineProperty(Vue.prototype, '$axios', {value: axios});
    }
}