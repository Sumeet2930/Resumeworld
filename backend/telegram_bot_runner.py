#!/usr/bin/env python3
"""
Telegram Bot Runner for AI Resume Analyzer
Run this to start only the Telegram bot (without the web API)
"""

import asyncio
import sys
import logging
from app.services.telegram_bot import start_telegram_bot

# Configure logging
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)


async def main():
    """Main entry point"""
    logger.info("🤖 Starting AI Resume Analyzer Telegram Bot...")
    try:
        await start_telegram_bot()
    except KeyboardInterrupt:
        logger.info("Bot stopped by user")
        sys.exit(0)
    except Exception as e:
        logger.error(f"Fatal error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    asyncio.run(main())
