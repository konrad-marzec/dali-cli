DALI commands
-------------

These commands take the form YAAA AAAS xxXXxx. Each letter here stands for one bit.

Y: type of address
  - 0bin:    short address
  - 1bin:    group address or collective call

A: significant address bit

S: selection bit (specifies the significance of the following eight bits):
  - 0bin:    the 8 xxXXxx bits contain a value for direct control of the lamp power
  - 1bin:    the 8 xxXXxx bits contain a command number.

x: a bit in the lamp power or in the command number

Type of Addresses
-----------------

Type of Addresses Byte Description:
- Short address 0AAAAAAS (AAAAAA = 0 to 63, S = 0/1)
- Group address 100AAAAS (AAAA = 0 to 15, S = 0/1)
- Broadcast address 1111111S (S = 0/1)
- Special command 101CCCC1 (CCCC = command number)
