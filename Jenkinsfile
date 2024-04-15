pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        CI = 'true'
    }

    stages {
        stage('Prepare Environment') {
            steps {
                script {
                    bat 'git config --system core.longPaths true'
                }
            }
        }

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    bat 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    bat 'npm run build'
                }
            }
        }

        stage('Deliver') {
            steps {
                script {
                    // This should be your actual build tool's command to package/release the artifact
                    echo 'Packaging artifact...'
                    bat 'npm run package' // Example: npm script to create a production build/package
                }
            }
        }

        stage('Deploy to Dev Env') {
            steps {
                script {
                    echo 'Deploying to Development environment...'
                    bat 'deploy-dev.bat' // Replace with your actual deployment command/script
                }
            }
        }

        stage('Deploy to QAT Env') {
            steps {
                script {
                    echo 'Deploying to QAT environment...'
                    bat 'deploy-qat.bat' // Replace with your actual deployment command/script
                }
            }
        }

        stage('Deploy to Staging Env') {
            steps {
                script {
                    echo 'Deploying to Staging environment...'
                    bat 'deploy-staging.bat' // Replace with your actual deployment command/script
                }
            }
        }

        stage('Deploy to Production Env') {
            steps {
                script {
                    echo 'Deploying to Production environment...'
                    bat 'deploy-prod.bat' // Replace with your actual deployment command/script
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            echo 'Build process completed.'
        }
        success {
            echo 'Build completed successfully.'
        }
        failure {
            echo 'Build failed. Check logs for details.'
        }
    }
}
