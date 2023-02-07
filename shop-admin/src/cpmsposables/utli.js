import { ElNotification,ElMessage, ElMessageBox  } from 'element-plus'
import nprogress from 'nprogress'


export const toast = (message,type = 'success')=>{
    ElNotification({
        message,
        type,
        duration:3500
    })
}

export const showModel = (content = '提示内容',type = 'Warning',title = '')=>{
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type
        }
      )
       
}

export const showFullLoading = () =>{
    nprogress.start()
}
export const hideFullLoading = () =>{
    nprogress.done()
}