const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 读取服务器信息
function readServerInfo() {
    try {
        const userInfoPath = path.join(__dirname, 'userinfo.json');
        const userInfoContent = fs.readFileSync(userInfoPath, 'utf8');
        return JSON.parse(userInfoContent);
    } catch (error) {
        console.error('读取服务器信息失败:', error.message);
        process.exit(1);
    }
}

// 执行命令
function executeCommand(command, options = {}) {
    console.log(`执行命令: ${command}`);
    try {
        const result = execSync(command, {
            cwd: options.cwd || process.cwd(),
            stdio: 'inherit',
            shell: "powershell.exe",
            ...options
        });
        return result;
    } catch (error) {
        console.error(`命令执行失败: ${error.message}`);
        process.exit(1);
    }
}

// 主函数
async function main() {
    console.log('================================');
    console.log('朝阳大屏项目自动化部署脚本');
    console.log('================================');
    
    try {
        // 1. 进入项目根目录
        const projectPath = path.join('D:', 'project', '01ChaoYangBigScreen');
        console.log(`进入项目目录: ${projectPath}`);
        process.chdir(projectPath);
        
        // 2. 执行 nvm use 20 切换到node20环境
        console.log('切换Node.js版本到20...');
        executeCommand('nvm use 20');
        
        // 3. 执行 pnpm run build 打包项目
        console.log('正在打包项目...');
        executeCommand('pnpm run build');
        
        // 4. 读取服务器信息
        const serverInfo = readServerInfo();
        const { username, ip, password } = serverInfo;
        console.log('服务器信息读取成功');
        
        // 5. 上传文件到服务器
        console.log('正在上传文件到服务器...');
        
        // 正确指定 dist 目录路径
        const distPath = path.join(projectPath, 'dist');
        const remotePath = '/data/exam/report';
        
        // 检查 dist 目录是否存在
        if (!fs.existsSync(distPath)) {
            console.error('错误：dist 目录不存在，请确保项目已成功构建');
            process.exit(1);
        }
        
        // 检查 dist 目录是否为空
        const files = fs.readdirSync(distPath);
        if (files.length === 0) {
            console.error('错误：dist 目录为空，请确保项目已成功构建');
            process.exit(1);
        }
        
        console.log(`dist 目录包含 ${files.length} 个项目`);
        
        // 使用 scp 上传 dist 目录中的所有文件到服务器
        console.log('使用scp上传文件...');
        try {
            // 正确的命令格式，确保只传输 dist 目录内容
            const scpCommand = `scp -r "${distPath}"/* ${username}@${ip}:${remotePath}/`;
            executeCommand(scpCommand);
        } catch (scpError) {
            console.error('文件传输失败，请确保服务器信息正确且网络连接正常');
            process.exit(1);
        }
        
        console.log('================================');
        console.log('部署完成！');
        console.log('================================');
        
    } catch (error) {
        console.error('部署过程中发生错误:', error.message);
        process.exit(1);
    }
}

// 执行主函数
main();