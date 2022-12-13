Packet data consists of lists and integers. Each list starts with [, ends with ], and contains zero
or more comma-separated values (either integers or other lists). Each packet is always a list and
appears on its own line.

When comparing two values, the first value is called left and the second value is called right.
Then:

- If both values are integers, the lower integer should come first. If the left integer is lower
  than the right integer, the inputs are in the right order. If the left integer is higher than the
  right integer, the inputs are not in the right order. Otherwise, the inputs are the same integer;
  continue checking the next part of the input.
- If both values are lists, compare the first value of each list, then the second value, and so on.
  If the left list runs out of items first, the inputs are in the right order. If the right list
  runs out of items first, the inputs are not in the right order. If the lists are the same length
  and no comparison makes a decision about the order, continue checking the next part of the input.
- If exactly one value is an integer, convert the integer to a list which contains that integer as
  its only value, then retry the comparison. For example, if comparing [0,0,0] and 2, convert the
  right value to [2] (a list containing 2); the result is then found by instead comparing [0,0,0]
  and [2].
