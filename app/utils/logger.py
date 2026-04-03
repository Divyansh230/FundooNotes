from loguru import logger
import sys
import os


class Logger:
    def __init__(self):
        log_path = "app/logs/app.log"
        os.makedirs("app/logs", exist_ok=True)        
        logger.remove()
        logger.add(
            sys.stdout,
            level="INFO",
            format="{time} | {level} | {message}"
        )

        logger.add(
            log_path,
            rotation="1 MB",
            retention="10 days",
            level="INFO",
            format="{time} | {level} | {message}"
        )

    def info(self, message):
        logger.info(message)

    def error(self, message):
        logger.error(message)

    def warning(self, message):
        logger.warning(message)

    def debug(self, message):
        logger.debug(message)


# 🔥 Single instance (global use)
logger_instance = Logger()