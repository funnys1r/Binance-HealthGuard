# Binance Simple Earn Skill

This skill allows the AI Agent to retrieve the user's current holdings in Binance Simple Earn (Flexible and Locked products). It provides visibility into assets that are not in the Spot wallet.

## API Integration

| Endpoint | Description | Security | Parameters |
| :--- | :--- | :--- | :--- |
| `/sapi/v1/simple-earn/flexible/position` (GET) | Get flexible positions | USER_DATA | asset, current, size |
| `/sapi/v1/simple-earn/locked/position` (GET) | Get locked positions | USER_DATA | asset, current, size |

## Usage Examples

- "What is my total balance in Simple Earn?"
- "Do I have any ARB in flexible products?"
- "Calculate the combined value of my Spot and Earn holdings."

## Risk Control
This skill only requires **READ-ONLY** permissions. 
