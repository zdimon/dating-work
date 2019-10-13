Chat logic
==========

.. uml::

   actor Man
   actor Woman
   collections System
   group First message from Man
	   Man -> System: First message
	   System -> Woman: Create a new contact at the first place
	   System -> Man: Taking credits
	   Woman -> System: Answer
	   System -> Man: Move the contact to the first place
   end

   group First message from Woman
	   Woman -> System: First message
	   System -> Man: Create a new contact at the first place
	   Man -> System: Answer
	   System -> Man: Taking credits
	   System -> Man: Move the contact to the first place
   end

   group 2 min Man idle
	   System -> Man: Stop taking credits
   end

   group Click stop button
   	System -> Man: Stop taking credits
   end
	
   group Send sticker
   	System -> Man: Take credits by sticker price
   end
	
   group Send pic
   	System -> Man: Take credits by pic price
   end

   group Camera
   	Woman -> System: Turn the cam on
	System -> Man: Take credits by cam price
	Man -> System: Turn the cam on
        System -> Man: Continue taking credits by the same cam price
   end