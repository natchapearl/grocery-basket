﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace JustGrocery.Models.Response
{
    public class SuccessResponse : BaseResponse
    {
        public SuccessResponse()
        {
            this.IsSuccessful = true;
        }
    }
}